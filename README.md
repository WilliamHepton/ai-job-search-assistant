# AI Job-Search Assistant

> A set of n8n workflows that find, score and email me the best-matching AI automation jobs every day, and write a **tailored CV for every good match**, cutting my daily search from **X** to **Y** minutes.

🚧 **Work in progress.** Sections marked _TODO_ are filled in as the build progresses.

<!-- TODO: demo video link + 2 screenshots (workflow canvas, digest email) -->

## The problem

Job hunting by hand means opening several job sites every day, skimming dozens of listings, judging each one against my skills, copying the good ones into a list and then rewriting my CV for each application. _TODO: measured minutes per day (see [docs/process-analysis.md](docs/process-analysis.md))._

## How it works

Every day at 11:30, n8n:

1. **Fetches** new UK listings from the **Adzuna** and **Reed** APIs for 12 search terms based on my target roles (implementation, integration and automation first), both near Malvern and remote. Titles that are clearly wrong (too senior, or trades such as electrical, civil or HVAC) are dropped before scoring.
2. **De-duplicates** them within the run and against jobs already in the sheet, including the same job listed on both sites (matched on title + company).
3. **Scores** each new job with Claude against my profile: match score 0–100, matched and missing skills, and a one-line reason. The output is validated JSON.
4. **Logs** every job to a Google Sheet (OAuth2).
5. **Writes a tailored CV** (PDF) for every job scoring 50 or more, saves it to Google Drive and links it in the sheet. See below.
6. **Emails** a Gmail digest of the top 5 matches, each with a link to its tailored CV, plus token and cost stats.

Also:

7. A **webhook** scores a job I paste in by hand, logs it and returns the score and the CV link as JSON.
8. An **error workflow** emails me if any run fails.

See [docs/architecture.md](docs/architecture.md) for the diagrams.

## Tailored CVs: "select, don't invent"

An LLM writing CVs freely will sooner or later claim a skill I don't have. So here the model **only chooses**; it never writes facts.

- **One master profile** ([example](examples/about-me.example.md)) holds every fact about me, each with an ID such as `[YFT-04]`. It also lists rules for tailoring and the skills I have **not** learned yet. The real file contains my contact details, so it lives outside the repo and is mounted into n8n **read-only**.
- **Claude picks, code prints.** For each job, Claude (`claude-haiku-5-5`) returns a fixed JSON schema: a headline, a 3–4 sentence profile, the skill items, and the bullets to use. Each bullet cites the fact ID it comes from. Light rewording is allowed. Name, contact details, job titles, employers, dates and education are filled in by code from the profile, never by the model.
- **A validator checks every line** before anything is printed:
  - Each bullet must cite a real fact ID **from the same role**. Unknown IDs, `TODO` lines and "interviews only" facts are dropped.
  - Skills must be items from the matching skill line in the profile.
  - No "not yet learned" term (Python, Zapier, MCP…) may appear anywhere. Common words such as "Make" are only matched with the exact capitalisation.
  - A reworded bullet may not add a **number** the original doesn't contain, and may not grow much longer. If it fails, the original wording is used.
  - The headline must start "Software Developer |" and use only words from the headline options or the job title.
  - A bullet may not name a technology its own fact does not name. A last check reports any skill on the CV that is not in the profile.
  - Code sets the skill layout: Docker and Git on a "Tools and DevOps" line, and a fixed order for Microsoft-stack jobs.
  - If a role ends up with no valid bullets, its original bullets are used. Roles are always shown newest first.
  - [`tests/validate-cv.test.js`](tests/validate-cv.test.js) runs the real node code against a response that tries all of these tricks.
- **Prompt injection:** job descriptions are untrusted text. The model has no tools, must answer in the fixed schema, and is told to ignore instructions inside the listing. The validator also catches anything that slips through.
- **Rendering:** a small Mustache-style renderer in a Code node fills [`templates/cv-template.html`](templates/cv-template.html), escaping all text. **Gotenberg** (headless Chromium, in its own container with no published port) turns it into an A4 PDF. If the PDF is over 2 pages, the earlier-roles line, then the Baccalauréat, then bullets from the longest entry are dropped, and it's rendered once more.
- **Storage:** the PDF is uploaded to a `Tailored CVs` folder in Google Drive as `Name_CV_Company_JobTitle_YYYY-MM-DD.pdf`. The sheet gets `cv_link`, `cv_generated_at` and `tailoring_notes` (what the model emphasised and why, plus anything the validator fixed).

Settings (threshold 50, at most 10 CVs per run, 14-day backfill, 3 attempts per job) live in one **CV config** node.

## Tech used

- **n8n** (self-hosted in Docker Compose), with **Gotenberg** for HTML → PDF
- **Adzuna API** and **Reed API** for job data
- **Anthropic Claude API** (`claude-haiku-5-5`) with structured JSON outputs and prompt caching
- **Google Sheets, Gmail and Drive** via OAuth2
- **Webhooks** with header-token auth

## Design decisions

- **De-duplication:** by `job_id` within the run and against the sheet, plus a normalised title + company key, because Adzuna also lists Reed jobs.
- **JSON validation and fallback:** structured outputs guarantee the shape. A parser still checks every value, so one bad response is logged as a parse error instead of breaking the run.
- **Retries and rate limits:** every API call retries 3 times with a 5-second wait, and requests are sent in small timed batches.
- **One shared CV workflow:** the daily scan and the webhook both call the same sub-workflow, so the CV logic exists once.
- **Failures never stop the run:** if a CV fails (API error, refusal, failed PDF or upload), the reason goes into `tailoring_notes` and the next run retries it, up to 3 times. If one job API is down, the other still runs and the digest says so.
- **Cost caps:** at most 40 jobs scored and 10 CVs per run, plus a spend limit on the API key.
- **Error workflow:** any failed run emails me the failing node and the error.

## Security and privacy

- **Least-privilege Google scopes:**
  - Sheets: read/append
  - Gmail: `gmail.compose` (send only)
  - Drive: **`drive.file` only**, so the app can see only the files and the folder it created itself, not the rest of my Drive. n8n's built-in Drive credential asks for full Drive access, so the upload uses an HTTP Request node with a generic Google OAuth2 credential limited to that one scope.
- **Formula injection:** values are written to the sheet as RAW text, so a job title starting with `=` is never run as a formula.
- **Email output:** all values in the digest are HTML-escaped, and only `http(s)` links are made clickable.
- **Secrets and personal data:** all keys are stored as n8n credentials. My real profile and the generated CVs are git-ignored and live outside the repo. My contact details are never sent to the LLM; only the fact list is.
- **File access:** n8n can read only two read-only folders (`N8N_RESTRICT_FILE_ACCESS_TO`), and its port is bound to `127.0.0.1`.

## Cost

| Item | Cost |
|---|---|
| Scoring, per job | ~$0.0002 |
| Tailored CV, per job (Haiku 5.5, ~7k tokens in / ~4.5k out incl. thinking) | **~$0.003** |
| Same CV on Sonnet 5.5 (tested, very similar quality) | ~$0.04 |
| A typical day (40 jobs scored, 4 CVs) | ~$0.02 |

_TODO: measured monthly cost after the 7-day run._

## Results

_TODO: before/after minutes per day, jobs reviewed per day, cost per month._

## Setup

1. Copy `.env.example` to `.env` and set `PRIVATE_DIR` to a folder **outside** the repo.
2. Copy [`examples/about-me.example.md`](examples/about-me.example.md) into that folder as `about-me.md` and fill in your own facts.
3. Run `docker compose up -d` (starts n8n on http://localhost:5678 and Gotenberg).
4. Create n8n credentials:
   - Adzuna (custom auth)
   - Reed (basic auth)
   - Anthropic (header `x-api-key`)
   - Google Sheets and Gmail OAuth2
   - a generic Google OAuth2 credential with scope `https://www.googleapis.com/auth/drive.file`
   - a header token for the webhook
5. Import the workflows from `workflows/`, set your sheet URL and email address, and publish them.
6. Add these column headers to your sheet: `job_id, date_found, source, title, company, location, salary, url, score, matched_skills, missing_skills, reason, status, cv_link, cv_generated_at, tailoring_notes`.
7. Run the validator test: `node tests/validate-cv.test.js`.

## Limitations and next steps

- Adzuna only returns a short description snippet, so scoring and tailoring work on partial information for those jobs.
- Older jobs picked up again for a CV have no description stored in the sheet, so they're tailored from the title and the scoring notes.
- The validator stops invented facts and numbers, but it can't judge tone. CVs are drafts to check before sending.
- Out of scope for now: auto-applying, cover letters, a front-end app.

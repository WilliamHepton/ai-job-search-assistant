# AI Job-Search Assistant

> An n8n workflow that finds, scores and emails me the best-matching AI automation jobs every morning, cutting my daily search from **X** to **Y** minutes.

🚧 **Work in progress.** Sections marked _TODO_ are filled in as the build progresses.

<!-- TODO: demo video link + 2 screenshots (workflow canvas, digest email) -->

## The problem

Job hunting by hand means opening several job sites every day, skimming dozens of listings, judging each one against my skills and copying the good ones into a list. _TODO: measured minutes per day (see [docs/process-analysis.md](docs/process-analysis.md))._

## How it works

Every morning at 07:30, n8n:

1. **Fetches** new UK listings from the Adzuna API (and optionally Reed) for a set of search terms.
2. **De-duplicates** them, both within the run and against jobs already in the sheet.
3. **Scores** each new job with Claude against my profile: match score 0–100, matched and missing skills, a one-line reason. The output is validated JSON.
4. **Logs** every job to a Google Sheet (OAuth2).
5. **Emails** a Gmail digest (OAuth2) of the top 5 matches.

Also:

6. A **webhook** scores a job I paste in by hand and logs it in the same way.
7. An **error workflow** emails me if any run fails.

See [docs/architecture.md](docs/architecture.md) for the diagram.

## Tech used

- **n8n** (self-hosted in Docker)
- **Adzuna API** / **Reed API** for job data
- **Anthropic Claude API** (`claude-haiku-5-5`) for scoring
- **Google Sheets + Gmail** via OAuth2
- **Webhooks** with header-token auth

## Design decisions

_TODO_

- De-duplication strategy
- JSON validation and fallback
- Retries and rate limits
- Cost cap per run
- Error workflow

## Results

_TODO: before/after minutes per day, jobs reviewed per day, cost per month._

## Setup

_TODO_

1. Run n8n in Docker.
2. Copy `.env.example` and get the API keys.
3. Set up Google OAuth (Sheets + Gmail).
4. Import the workflows from `workflows/`.
5. Add your own candidate profile.

## Limitations and next steps

_TODO_

- Job APIs only return a short description snippet, so scoring works on partial information.
- Out of scope for now: auto-applying, cover letters, a front-end app.

# About Me: master profile for tailored CVs

> **Example file.** Contact details are fake. Copy it to your private folder as `about-me.md` and fill in your own facts; never commit the real one.
>
> This is the single source of truth for every tailored CV. The CV generator may **only** use facts in this file: it can choose, order and lightly reword them, but never invent skills, employers, dates, numbers or results.
>
> Every usable fact has an ID like `[YFT-03]`. The generator must cite the IDs it used, so each CV line can be traced back here.
>
> The generator ignores any line containing `TODO`, so placeholders never reach a CV.

---

## 1. Contact

| Field | Value |
| --- | --- |
| Name | Alex Example |
| Location | Malvern, Worcestershire, UK |
| Email | alex@example.com |
| Phone | 07700 900000 |
| LinkedIn | linkedin.com/in/alex-example |
| GitHub | github.com/WilliamHepton |
| Languages | Fluent English & French |
| Right to work | (example) Full right to work in the UK. Not printed on the CV. |
| Driving licence | Full UK driving licence. Not printed on the CV by default; add to the contact line only for roles that mention travel to client sites. |

---

## 2. What I'm looking for

- **Target roles (in priority order):**
    1. Full-stack developer (TypeScript, React, React Native); .NET / C# developer
    2. Integration or API developer, automation developer, implementation specialist or consultant
    - SaaS, gym and fitness software companies are a good domain fit.
- **Prefer:** hands-on building and integration work. **Avoid:** people-management roles, pure change-management roles, senior leadership roles.
- **Location:** fully remote (UK), hybrid within 45 miles of Malvern, or on-site within 30 miles.
- **Availability:** immediately
- **Level:** do not label the CV junior or senior. Let the experience speak.

---

## 3. Headline options

The generator picks the one that best matches the job title, or writes a close variant using only these words and the job's own title.

- `[HL-05]` Software Developer | Full-Stack, .NET & Integrations
- `[HL-01]` Software Developer | AI Automation & Integrations
- `[HL-02]` Software Developer | n8n, LLM APIs & Integrations
- `[HL-03]` Software Developer | Building AI automations with n8n & LLM APIs
- `[HL-04]` Software Developer | AI Implementation & Automation Projects

Headlines: HL-05 is the default; use an automation headline (HL-01 to HL-04) only for automation or AI jobs. Headlines always start with "Software Developer" (the title actually held). Never use a title-style headline like "AI Automation Specialist" or "Consultant" until there is paid experience in that role.

---

## 4. Profile building blocks

The generator writes a 3–5 sentence profile using only these points. Open with what I build (PR-01), never with the degree. Default selection: PR-01, PR-11, PR-06, PR-08.

- `[PR-01]` Software developer building business applications, integrations and AI automations.
- `[PR-11]` Commercial C#/.NET experience, plus TypeScript, SQL and PostgreSQL on Supabase and Cloudflare.
- `[PR-12]` BSc (Hons) Computing and Software Development (2:1).
- `[PR-02]` Builds AI automations and integrations, including live tools for a small business.
- `[PR-03]` Built a self-hosted n8n pipeline that pulls UK job listings from two APIs, scores them with the Claude API and emails a daily digest.
- `[PR-04]` Built an AI FAQ assistant that answers members' questions on a gym's live website.
- `[PR-05]` As a voluntary director, runs the finances, systems and admin of a new gym in the Malvern area.
- `[PR-06]` Built a full gym management platform (mobile app, staff portal and backend) and an AI FAQ assistant live on a gym's website.
- `[PR-07]` Works by mapping a business process, connecting systems with APIs and webhooks, adding AI where it saves time, and handing over with clear documentation.
- `[PR-08]` Three years running an independent studio that shipped two commercial games.
- `[PR-09]` Fluent in English and French.
- `[PR-10]` Looking for a full-stack, .NET, integration or automation developer role, remote or hybrid near Malvern.

---

## 5. Skills

Grouped for the CV. The generator may reorder groups and items to match the job, and may drop items, but may not add any.

- `[SK-PROG]` **Programming:** C#, .NET, TypeScript, JavaScript, SQL, PostgreSQL, C++, Java, MongoDB, HTML/CSS, Git/GitHub, Docker
- `[SK-PLAT]` **Web, mobile and cloud:** React Native / Expo, Supabase, Cloudflare, Android
- `[SK-AUTO]` **Integration and automation:** REST APIs, webhooks, third-party API integration, Google OAuth2, n8n, data pipelines, error handling and alerting
- `[SK-AI]` **AI:** Claude API (structured JSON outputs), prompt design, retrieval-based FAQ assistant, LLM cost control, Claude Code
- `[SK-SEC]` **Security:** least-privilege OAuth scopes, secrets management, input sanitising
- `[SK-DEL]` **Delivery:** end-to-end project ownership, process analysis, choosing and rolling out business software, technical documentation for non-technical users, managing contractors
- `[SK-BIZ]` **Business:** small-business finance and cash-flow management, payroll and workplace pension setup, marketing budget planning
- `[SK-GAME]` **Game development:** Unreal Engine 5, Godot

**Not yet learned: never list these.** Tool A, Tool B

Replace Tool A and Tool B with the tools you have not used yet. The validator blocks them anywhere on a CV.

---

## 6. Experience

### Finance & Operations Director (voluntary), Yeomans Functional Training Ltd
*New independent gym, Hanley Swan (near Malvern), 70+ members · led all software, automation and integrations | May 2026 – Present*

- `[YFT-01]` Oversee finances and cash flow, set up payroll, and evaluated, selected and integrated the back-office software.
- `[YFT-02]` Run the back-office operations: admin, software selection and membership systems for 70+ members.
- `[YFT-03]` Evaluated, selected and integrated software tools for back-office admin workflows, reducing manual work so the team can focus on members.
- `[YFT-04]` Designed and built a replacement for the gym's management software (GoTeamUp): member mobile app (React Native / Expo, also exported as a web app), staff web portal and serverless backend in TypeScript and SQL on Supabase (PostgreSQL, Auth, row-level security and edge functions) and Cloudflare.
- `[YFT-14]` Owned it end to end, from requirements and data design to build, using an AI-assisted workflow (Claude Code). Built and tested, not yet live; launching once the Apple developer account is approved.
- Default bullets, in this order: YFT-04, YFT-14, YFT-06, YFT-11, YFT-05, YFT-01. YFT-11 always follows YFT-06. Use at most one other bullet about finance, operations or marketing, and YFT-13 only for jobs about AI cost.
- YFT-04 and YFT-14 always appear together, YFT-04 first. The app is built and tested but not live: never say it is in use, has paying members or has replaced GoTeamUp.
- `[YFT-05]` Designed and built the gym's website (yeomansgym.co.uk) with AI assistance.
- `[YFT-06]` Built an AI FAQ assistant for the gym's website (yeomansgym.co.uk/faq) that answers members' questions from the gym's own policies, prices and timetable, and stays strictly within that scope.
- `[YFT-11]` Backtested it against 16 real questions emailed by a member: it answered all 16 accurately, and saves staff up to 30 minutes per question. Cost controls keep it to about £0.10 a month.
- `[YFT-13]` Built cost controls into the FAQ assistant: a limit of 10 questions per user per day and a hard spending cap of £2 a month. Each answer costs £0.00003–£0.00013, about £0.10 a month in total.
- `[YFT-09]` Restructured the marketing budget, replacing an outsourced content contract with an in-house content workflow and moving spend to local advertising.
- `[YFT-10]` Work with the primary director and shareholders on business strategy and team coordination.

### Co-Founder & Developer, Thornspire Games Ltd
*Two-person independent games studio, remote | Nov 2023 – Present*

- `[TG-01]` Co-founded and run a two-person independent software studio, serving as primary developer across commercial products.
- `[TG-02]` Designed, built and commercially released Stoneguard, a 3D survival defence management game in Unreal Engine 5, owning architecture, C++ and Blueprint implementation, UI/UX, asset integration and production.
- `[TG-03]` Developed Heart Harvest, a 2D detective game in Godot, commercially released in November 2026; the other co-founder led the project and its design. Both games received very positive player reviews.
- `[TG-04]` Managed delivery partners such as contractors and publishers while keeping ownership of project and technical delivery.
- `[TG-08]` Hired and coordinated 4 contractors for Stoneguard (music, animation and 3D texturing), and managed publishers while keeping ownership of technical delivery.
- `[TG-09]` Both games are rated Very Positive on Steam.
- `[TG-05]` Wrote user-friendly documentation to onboard content-creation and social-media teams to technical tools.
- `[TG-06]` Assessed and adopted new tools quickly where they paid off, including AI assistants for debugging and C++ tooling.
- Default bullets: TG-02, TG-03, TG-08, TG-05, TG-06. TG-03 already covers TG-09, and TG-08 covers TG-04: never use both. Heart Harvest (TG-03) was led and designed by the other co-founder: never say I designed it.
- Sales figures are confidential: never mention or estimate them.

### Junior Full-Stack Developer, Puzzel
*Customer interaction and workforce management software | May 2020 – Sep 2020*

- `[PZ-01]` Developed backend and frontend features for workforce management software in C# and .NET.
- `[PZ-02]` Turned stored and real-time data into clear, actionable information for business managers.
- `[PZ-03]` Contributed to data handling, presentation logic and business-facing application features.
- `[PZ-04]` Had a minor role in helping design a new SQL database structure.
- Default bullets, in this order: PZ-01, PZ-02, PZ-04.

### Junior Full-Stack Developer (Internship), U-WFM
*Workforce management software | Feb 2020 – Apr 2020*

- `[UW-01]` Developed and shipped a new feature in an existing web application, working in a development team across backend and frontend.

### IT Technician (Internship), IT-Champion
*Exeter area | May 2019 – Jul 2019*

- `[IC-01]` Diagnosed and repaired PC hardware and software faults.

### Helpdesk Support (Internship), Sasola
*2016*

- `[SA-01]` Remote installation support for telecommunications software.

---

## 7. Projects

### AI Job-Search Assistant
*n8n, Claude API, Adzuna and Reed APIs, Google OAuth2, webhooks, Docker | github.com/WilliamHepton/ai-job-search-assistant*

- `[JS-01]` Five self-hosted n8n workflows (about 100 nodes). A daily scan searches two APIs (Reed and Adzuna), removes duplicates, ranks the results and scores up to 50 jobs per run with Claude.
- `[JS-10]` Runs as a multi-container Docker Compose setup: n8n and Gotenberg (HTML to PDF) in separate containers, with pinned image versions, read-only mounts and an internal-only PDF service.
- `[JS-11]` A validator checks every CV line against a fact list, to block invented claims. Automated tests run the real workflow code.
- `[JS-12]` Calculates job distances in code, detects remote, hybrid or on-site wording, and enforces score limits instead of trusting the model.
- `[JS-02]` Produces a tailored CV and an interview brief for good matches. Results go to Google Sheets and an email digest.
- `[JS-03]` Claude scores each job against my profile from 0 to 100 with matched skills, missing skills and a reason. Output is guaranteed machine-readable using structured JSON outputs plus a validating fallback parser, so one bad response never breaks the run.
- `[JS-05]` Structured JSON outputs, retries, per-source health checks and error alerts keep it running when an API fails. Costs under £1 a month to run.
- `[JS-06]` A token-protected webhook scores jobs submitted by hand, validates input and returns JSON.
- `[JS-07]` Built for reliability and cost: retries with waits, rate-limited batching, a 50-job cap per run and a spend limit. Costs under £1 a month to run.
- `[JS-08]` Security: least-privilege OAuth scopes, plain-text sheet writes to block formula injection, escaped email output, prompt-injection-aware design, and no secrets in the public repo.
- `[JS-09]` Example of an interviews-only fact: something to talk through in person but never print. (Interviews only: never put this on the CV.)

### Gym management platform
*Claude Code, mobile app, web portal, backend*

- `[GP-01]` Full replacement for GoTeamUp: member mobile app, staff web portal and backend with custom features. See `[YFT-04]`.

### Car-wash delivery Android app (university)

- `[UNI-01]` Created and published an Android app for a car-wash delivery service as part of my degree.

---

## 8. Education

- `[ED-01]` **BSc (Hons) Computing and Software Development**, University of Plymouth | Sep 2020 – Jul 2021 | Upper Second-Class Honours (2:1), final-year top-up after BTS. Built and published an Android app for a car-wash delivery service.
- `[ED-02]` **BTS Services Informatiques aux Organisations (SLAM)**, Lycée Ozenne, Toulouse | 2018 – 2020 | UK equivalent: HND in IT Services for Organisations (software solutions and business applications)
- `[ED-03]` **French Baccalauréat STI2D (SIN)** | 2015 – 2017 | UK equivalent: A-levels / BTEC National Diploma in Digital & Information Systems. Include only if there is space.

---

## 9. Rules for tailoring

1. Use only facts with IDs from this file. No invented tools, numbers or results.
2. Keep dates, job titles and employer names exactly as written.
3. "In progress" items stay "building" or "developing".
4. Never list anything under "Not yet learned".
5. Reorder and choose bullets to match the job. Mirror the job's wording only where a fact here genuinely supports it.
6. The YFT role must always show "(voluntary)".
7. Never call the candidate "junior" or "senior" in the profile or headline. Never imply paid or client experience in automation: describe the projects as what they are (personal projects, or tools built for the gym).
8. British English spelling. No first-person "I" in bullets. Start bullets with a verb.
9. Maximum 2 A4 pages.
10. Job-search project: use JS-01, JS-02, JS-10, JS-11, JS-05 in that order unless the job clearly needs another. Never use JS-05 and JS-07 together.
11. Do not add GP-01: YFT-04 already covers the gym platform.
12. Keep skill groups short. Leave out Business and Game development unless the job needs them.

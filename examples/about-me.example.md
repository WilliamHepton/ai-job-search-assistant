# About Me: master profile for tailored CVs

> **Example file.** Contact details are fake. Copy it to your private folder as `about-me.md` and fill in your own facts; never commit the real one.
>
> This is the single source of truth for every tailored CV. The CV generator may **only** use facts in this file: it can choose, order and lightly reword them, but never invent skills, employers, dates, numbers or results.
>
> Every usable fact has an ID like `[YFT-03]`. The generator must cite the IDs it used, so each CV line can be traced back here.
>
> Lines marked `TODO` are for William to fill in or confirm. The generator must ignore any line containing `TODO`.

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
| Languages | English (fluent), French (fluent) |
| Right to work | (example) Full right to work in the UK. Not printed on the CV. |
| Driving licence | Full UK driving licence. Not printed on the CV by default; add to the contact line only for roles that mention travel to client sites. |

---

## 2. What I'm looking for

- **Target roles (in priority order):** AI Automation Specialist / Engineer, Automation Developer (n8n, Make, Power Automate), AI Implementation Consultant, Solutions Engineer, AI Integration Engineer. Backup: AI Adoption Specialist.
- **Prefer:** hands-on building and integration work. **Avoid:** people-management roles, pure change-management roles, senior leadership roles.
- **Location:** fully remote (UK), or hybrid within about 30 miles of Malvern (Worcester, Cheltenham, Gloucester, Hereford, Evesham, Tewkesbury).
- **Availability:** immediately
- **Level:** do not label the CV junior or senior. Let the experience speak.

---

## 3. Headline options

The generator picks the one that best matches the job title, or writes a close variant using only these words and the job's own title.

- `[HL-01]` Software Developer | AI Automation & Integrations
- `[HL-02]` Software Developer | n8n, LLM APIs & Integrations
- `[HL-03]` Software Developer | Building AI automations with n8n & LLM APIs
- `[HL-04]` Software Developer | AI Implementation & Automation Projects

Headlines always start with "Software Developer" (the title actually held). Never use a title-style headline like "AI Automation Specialist" or "Consultant" until there is paid experience in that role.

---

## 4. Profile building blocks

The generator writes a 3–4 sentence profile using only these points.

- `[PR-01]` Software developer with a BSc (Hons) in Computing and Software Development (2:1).
- `[PR-02]` Builds AI automations and integrations, including live tools for a small business.
- `[PR-03]` Built a self-hosted n8n pipeline that pulls UK job listings from two APIs, scores them with the Claude API and emails a daily digest.
- `[PR-04]` Built an AI FAQ assistant that answers members' questions on a gym's live website.
- `[PR-05]` As a voluntary director, runs the finances, systems and admin of a new gym in the Malvern area.
- `[PR-06]` Built a full gym management platform (member app, staff website and backend) with AI-assisted development.
- `[PR-07]` Works by mapping a business process, connecting systems with APIs and webhooks, adding AI where it saves time, and handing it over with clear documentation.
- `[PR-08]` Three years running an independent software studio that shipped two commercial games, both with very positive player reviews.
- `[PR-09]` Fluent in English and French.
- `[PR-10]` Looking for an AI automation or implementation role, remote or hybrid near Malvern.

---

## 5. Skills

Grouped for the CV. The generator may reorder groups and items to match the job, and may drop items, but may not add any.

- `[SK-AUTO]` **Automation and integration:** n8n (self-hosted in Docker), REST APIs, webhooks with token authentication, Google OAuth2 (Sheets, Gmail), third-party API integration (Adzuna, Reed, Anthropic), data pipelines, JSON, retries, error workflows and alerting
- `[SK-AI]` **AI and LLMs:** Claude API (Messages API, structured JSON outputs), prompt design, retrieval-based FAQ assistant, LLM cost control, handling prompt injection, Claude Code, ChatGPT, AI-assisted software development
- `[SK-PROG]` **Programming:** JavaScript (including n8n Code nodes), C#, .NET, C++, Java, SQL, MongoDB, HTML/CSS, Git/GitHub, Docker
- `[SK-SEC]` **Security:** least-privilege OAuth scopes, secrets management, incident response, input sanitising, spreadsheet formula-injection protection
- `[SK-DEL]` **Delivery:** end-to-end project ownership, process analysis, choosing and rolling out business software, technical documentation for non-technical users, managing contractors and publishers
- `[SK-BIZ]` **Business:** small-business finance and cash-flow management, payroll and workplace pension setup, marketing budget planning
- `[SK-PLAT]` **Platforms:** app and web development, Android, Unreal Engine 5, Godot, Adobe Creative Suite

**Not yet learned: never list these.** Make, Zapier, Power Automate, Microsoft 365 Copilot, Copilot Studio, Python, MCP / AI agents with tool calling, change-management methods (ADKAR, Prosci), GitHub Copilot, Replit Agent.

---

## 6. Experience

### Finance & Operations Director (voluntary), Yeomans Functional Training Ltd
*New independent gym, Hanley Swan (near Malvern) | May 2026 – Present*

- `[YFT-01]` Oversee the gym's finances, accounting and cash flow, using the data to find cost savings and protect margins.
- `[YFT-02]` Run the back-office operations: admin, software selection and membership systems for 70+ members.
- `[YFT-03]` Evaluated, selected and integrated software tools for back-office admin workflows, reducing manual work so the team can focus on members.
- `[YFT-04]` Built a replacement for the gym's management software (GoTeamUp) using Claude Code: member mobile app, staff web portal and full backend, including custom features off-the-shelf tools didn't offer. Due to launch once the Apple developer account is approved.
- `[YFT-05]` Designed and built the gym's website (yeomansgym.co.uk) with AI assistance.
- `[YFT-06]` Added an AI FAQ assistant to the website (yeomansgym.co.uk/faq) that answers members' questions from the gym's own policies, prices and timetable, and stays strictly within that scope.
- `[YFT-11]` Backtested the FAQ assistant against a real member's large batch of emailed questions: it answered every one accurately.
- `[YFT-12]` The FAQ assistant saves staff up to 30 minutes per question, as they no longer need to re-read the terms to answer.
- `[YFT-13]` Built cost controls into the FAQ assistant: a limit of 10 questions per user per day and a hard spending cap of £2 a month. Each answer costs £0.00003–£0.00013, about £0.10 a month in total.
- `[YFT-08]` Set up payroll and a workplace pension (NEST) for part-time staff.
- `[YFT-09]` Restructured the marketing budget, replacing an outsourced content contract with an in-house content workflow and moving spend to local advertising.
- `[YFT-10]` Work with the primary director and shareholders on business strategy and team coordination.

### Founder & Developer, Thornspire Games Ltd
*Independent games studio, remote | Nov 2023 – Present*

- `[TG-01]` Co-founded and run a two-person independent software studio, serving as primary developer across commercial products.
- `[TG-02]` Designed, built and commercially released Stoneguard, a 3D survival defence management game in Unreal Engine 5, owning architecture, C++ and Blueprint implementation, UI/UX, asset integration and production.
- `[TG-03]` Designed, built and commercially released Heart Harvest, a 2D detective game in Godot (3 November 2026).
- `[TG-04]` Managed delivery partners such as contractors and publishers while keeping ownership of project and technical delivery.
- `[TG-08]` Hired and coordinated 4 contractors for Stoneguard (music, animation and 3D texturing), while also producing animation and texturing.
- `[TG-09]` Both games received very positive player reviews.
- `[TG-05]` Wrote user-friendly documentation to onboard content-creation and social-media teams to technical tools.
- `[TG-06]` Assessed new tools and technologies quickly and adopted them where they paid off, including AI assistants for debugging and building C++ tooling.
- `[TG-07]` Designed and maintained software architecture with a focus on clean, maintainable code.
- Sales figures are confidential: never mention or estimate them.

### Junior Full-Stack Developer, Puzzel
*Customer interaction and workforce management software | May 2020 – Sep 2020*

- `[PZ-01]` Worked on workforce management software across backend and frontend components.
- `[PZ-02]` Turned stored and real-time data into clear, actionable information for business managers.
- `[PZ-03]` Contributed to data handling, presentation logic and business-facing application features.

### Junior Full-Stack Developer (Internship), U-WFM
*Workforce management software | Feb 2020 – Apr 2020*

- `[UW-01]` Developed and shipped a new feature in an existing web application.
- `[UW-02]` Worked in a development team, learning from senior developers across backend and frontend.

### IT Technician (Internship), IT-Champion
*Exeter area | May 2019 – Jul 2019*

- `[IC-01]` Diagnosed and repaired PC hardware and software faults.

### Helpdesk Support (Internship), Sasola
*2016*

- `[SA-01]` Provided remote installation support and troubleshooting for telecommunications software.

---

## 7. Projects

### AI Job-Search Assistant
*n8n, Claude API, Adzuna and Reed APIs, Google OAuth2, webhooks, Docker | github.com/WilliamHepton/ai-job-search-assistant*

- `[JS-01]` Three self-hosted n8n workflows (about 30 nodes) running in Docker.
- `[JS-10]` Runs as a multi-container Docker Compose setup: n8n and Gotenberg (HTML to PDF) in separate containers, with pinned image versions, read-only mounts, a persistent data volume and Gotenberg reachable only on the internal network.
- `[JS-02]` A daily scan pulls UK job listings from two APIs (Adzuna, Reed) across 7 search terms and 2 location modes, merges them, removes duplicates across sources (by title and company) and against previous runs, and drops stale and unsuitable listings before spending any tokens.
- `[JS-03]` Claude scores each job against my profile from 0 to 100 with matched skills, missing skills and a reason. Output is guaranteed machine-readable using structured JSON outputs plus a validating fallback parser, so one bad response never breaks the run.
- `[JS-04]` Results are logged to Google Sheets, and the top matches are emailed as an HTML digest with token and cost stats.
- `[JS-05]` Per-source health checks: if one API is down the run carries on and reports it; if both fail, an alert is sent. A separate error workflow emails details of any failure.
- `[JS-06]` A token-protected webhook scores jobs submitted by hand, validates input and returns JSON.
- `[JS-07]` Built for reliability and cost: retries with waits, rate-limited batching, a 40-job cap per run and a spend limit, keeping cost well under £1 a month.
- `[JS-08]` Security: least-privilege OAuth scopes, plain-text sheet writes to block formula injection, escaped email output, prompt-injection-aware design, and no secrets in the public repo.
- `[JS-09]` Handled a real security incident: reset an accidentally committed OAuth secret, removed it from git history and added safeguards to stop it recurring. (Interviews only: never put this on the CV.)
- `[JS-TODO]` TODO: time saved per day once the before/after measurement is done

### Gym management platform
*Claude Code, mobile app, web portal, backend*

- `[GP-01]` Full replacement for GoTeamUp: member mobile app, staff web portal and backend with custom features. See `[YFT-04]`.

### Car-wash delivery Android app (university)

- `[UNI-01]` Created and published an Android app for a car-wash delivery service as part of my degree.

---

## 8. Education

- `[ED-01]` **BSc (Hons) Computing and Software Development**, University of Plymouth | Sep 2020 – Jul 2021 | Upper Second-Class Honours (2:1)
- `[ED-02]` **BTS Services Informatiques aux Organisations (SLAM)**, Lycée Ozenne, Toulouse | 2018 – 2020 | UK equivalent: Higher National Diploma in IT Services for Organisations (software solutions and business applications)
- `[ED-03]` **French Baccalauréat STI2D (SIN)** | 2015 – 2017 | UK equivalent: A-levels / BTEC National Diploma in Digital & Information Systems. Include only if there is space.

## 9. Certifications

- None yet. TODO: add when completed (e.g. n8n course, PL-900).

---

## 10. Rules for tailoring

1. Use only facts with IDs from this file. No invented tools, numbers or results.
2. Keep dates, job titles and employer names exactly as written.
3. "In progress" items stay "building" or "developing".
4. Never list anything under "Not yet learned".
5. Reorder and choose bullets to match the job. Mirror the job's wording only where a fact here genuinely supports it.
6. The YFT role must always show "(voluntary)".
7. Never call the candidate "junior" or "senior" in the profile or headline. Never imply paid or client experience in automation: describe the projects as what they are (personal projects, or tools built for the gym).
8. British English spelling. No first-person "I" in bullets. Start bullets with a verb.
9. Maximum 2 A4 pages.

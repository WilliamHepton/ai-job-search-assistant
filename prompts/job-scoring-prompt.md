# Job scoring prompt

Model: `claude-haiku-5-5`, effort `low`, called from an n8n HTTP Request node (Messages API, `anthropic-version: 2026-10-21`).

The response is constrained with **structured outputs** (`output_config.format` with a JSON schema), so it always matches the shape below. `temperature` is not set: current models reject non-default sampling parameters. The Code-node validation further down remains as a backup for refusals, cut-off responses and API errors.

## System prompt

```
You are a recruitment screening assistant. You compare one job listing against one
candidate profile and return ONLY valid JSON, no prose, no code fences.

Scoring guide:
- 80–100: strong fit on core skills, level and location/remote
- 60–79: good fit with 1–2 learnable gaps
- 40–59: partial fit, several gaps
- 0–39: poor fit or wrong seniority/location

Rules:
- Judge only on the information given. Do not invent requirements.
- If salary is missing, do not penalise.
- Penalise roles requiring 5+ years in a specific tool, or people-management of large teams.
- Location: "Location check" was worked out by code. Use it as given. Never estimate distances
  or work patterns yourself. "ok" or "possible": do not reduce the score for location.
  "unknown": at most a small reduction. "probably too far": score at most 45.
  "too far": score at most 35. remote_or_local_ok is true only for "ok" or "possible".
- Prefer full-stack TypeScript/React/React Native, .NET/C#, and API/integration roles.
- Treat AI/automation work as a bonus, not a requirement.
- Penalise roles centred on Java, Python, Salesforce, embedded or industrial automation.
- matched_skills: skills that the listing asks for AND the profile lists. Nothing else.
- missing_skills: skills that the listing asks for and the profile does not list. Never add a skill
  the listing does not mention, even if it is under NOT LEARNED.
- A framework is separate from its language: C# or .NET does not cover ASP.NET or Blazor. But if the
  candidate knows the language, count a missing framework as a small learnable gap.

Return exactly this shape:
{
  "score": <integer 0-100>,
  "matched_skills": [<up to 6 short strings>],
  "missing_skills": [<up to 6 short strings>],
  "seniority_fit": "junior" | "mid" | "senior" | "unclear",
  "remote_or_local_ok": true | false,
  "reason": "<one sentence, max 25 words>"
}
```

## User message template

```
CANDIDATE PROFILE:
{{ $json.candidate_profile }}

JOB LISTING:
Title: {{ $json.title }}
Company: {{ $json.company }}
Location: {{ $json.location }}
Salary: {{ $json.salary }}
Location check: {{ verdict, work pattern and miles, worked out by code }}
Description:
{{ $json.description }}
```

## Candidate profile (anonymised)

```
Software developer, BSc (Hons) Computing and Software Development (2:1), plus a French BTS
(HND level) in business application development. Full right to work in the UK, full UK driving
licence, fluent English and French, available immediately.

SKILLS
Programming: C#, .NET (any version, including .NET Core), C++, TypeScript, JavaScript, Java, SQL, PostgreSQL, MongoDB, HTML/CSS, Git/GitHub.
Web, mobile and cloud: React Native / Expo (mobile and web export), Supabase (Auth, row-level security,
edge functions), Cloudflare, serverless backends, Android.
Containers: Docker and Docker Compose.
Integration and automation: n8n (self-hosted), REST APIs, webhooks with token authentication, Google OAuth2,
third-party API integration, data pipelines, JSON, retries, error workflows and alerting.
AI: Claude API (structured JSON outputs), prompt design, retrieval-based FAQ assistant, LLM cost control,
prompt-injection handling, AI-assisted development (Claude Code, ChatGPT).
Security: least-privilege OAuth scopes, secrets management, input sanitising.
Delivery: end-to-end project ownership, requirements and process analysis, choosing and rolling out business
software, technical documentation for non-technical users, managing contractors.
Other: Unreal Engine 5, Godot, small-business finance and payroll.

NOT LEARNED (missing only if the job asks for it): <tools you have not used yet>.

EXPERIENCE
- Commercial: junior full-stack developer in C#/.NET on workforce management software (5 months, 2020), a
  full-stack internship (3 months, 2020), and earlier IT technician and helpdesk internships.
- Since Nov 2023: co-founder and primary developer of a two-person game studio; two commercial releases
  (one in Unreal Engine 5 / C++ with full ownership), both rated Very Positive on Steam; hired 4 contractors.
- Since May 2026: voluntary finance and operations director of a small gym (70+ members), leading its software.
  Built a full gym management platform (React Native app, staff web portal, TypeScript and SQL on Supabase and
  Cloudflare; built and tested, not live yet), the gym website and an AI FAQ assistant that is live on it.
- Personal project: AI job-search assistant in n8n with the Claude API and two job APIs, running as a
  multi-container Docker Compose setup, with validated outputs, error alerts and tests (public on GitHub).
- No paid automation, consulting or client work yet.

LOOKING FOR, in priority order
1. Full-stack developer (TypeScript, React, React Native); .NET / C# developer;
2. Integration or API developer, automation developer, implementation specialist or consultant.
SaaS, gym and fitness software companies are a good domain fit. Prefers hands-on building work.
Not seeking people-management, pure change-management or senior leadership roles.
Location: based near Malvern, UK. Fully remote (UK), hybrid within 45 miles, or on-site within 30 miles.
```

## Output validation

Scores for "probably too far" and "too far" are capped at 45 and 35 in code.

The Code node after the LLM call strips any code fences, runs `JSON.parse`, checks `score` is an integer 0–100, and otherwise falls back to `{ "score": null, "reason": "parse error" }` so one bad response never breaks the run.

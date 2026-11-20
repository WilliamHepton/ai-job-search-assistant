# Job scoring prompt

Model: `claude-haiku-5-5`, temperature 0.

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
- Penalise roles requiring 5+ years in a specific tool, people-management of large
  teams, or on-site work more than 30 miles from Malvern, UK.
- Prefer hands-on automation/building roles over pure change-management roles.

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
Description:
{{ $json.description }}
```

## Candidate profile (anonymised)

```
Software developer, BSc Computing and Software Development (2:1). Based near Malvern, UK;
wants remote or hybrid within 30 miles. Skills: C#, .NET, C++, JavaScript, Java, SQL,
MongoDB, REST APIs, webhooks, third-party API integration, n8n, LLM APIs (Claude),
retrieval-based AI assistants, AI-assisted development (Claude Code). Experience:
3 years running an indie game studio (2 commercial releases), voluntary finance and
operations director of a small gym (systems, software, finances), built a full gym
management platform (app, staff portal, backend) and an AI FAQ assistant. Short junior
full-stack developer roles. Seeking AI automation / implementation roles. Not seeking
people-management or senior leadership roles.
```

## Output validation

The Code node after the LLM call strips any code fences, runs `JSON.parse`, checks `score` is an integer 0–100, and otherwise falls back to `{ "score": null, "reason": "parse error" }` so one bad response never breaks the run.

# Architecture

Five n8n workflows, plus Gotenberg for PDFs, all in one Docker Compose setup.

```mermaid
flowchart LR
    A[A: Daily Job Scan] -- jobs 50+ --> D[D: Generate Tailored CV]
    B[B: Manual Job Webhook] -- job 50+ --> D
    A & B -- jobs with a CV --> E[E: Generate Job Brief]
    A & B & D & E -. on failure .-> C[C: Error Alerts]
    D & E -- HTML --> G[(Gotenberg)]
    D & E -- PDF --> DR[(Google Drive: Tailored CVs)]
    A & B --> GS[(Google Sheet)]
```

## Workflow A: Daily Job Scan

```mermaid
flowchart TD
    S[Schedule 11:30] --> CFG[Search config]
    CFG --> AQ[Build Adzuna queries] --> AZ[Adzuna API] --> AN[Normalise Adzuna jobs]
    CFG --> RQ[Build Reed queries] --> RD[Reed API] --> RN[Normalise Reed jobs]
    AN & RN --> M[Combine sources] --> CS[Check sources: fail only if all are down]
    CS --> D1[Remove duplicates in run: title + company]
    D1 --> RE[Read existing jobs] --> D2[Keep only new jobs: id or title + company]
    D2 --> F[Drop obvious mismatches] --> CAP[Cap 40 jobs]
    CAP --> SC[Score with Claude] --> P[Parse + validate JSON]
    P --> GS[(Append to sheet, RAW)]
    GS --> CC[CV candidates: this run + older rows without a CV]
    CC --> GEN[[Generate CVs: workflow D]]
    GEN --> UP[(Update CV columns by job_id)]
    GEN --> BC[Brief candidates: new CVs + older rows without a brief]
    BC --> BR[[Generate briefs: workflow E]]
    BR --> UB[(Update job_brief_link by job_id)]
    BR --> DG[Build digest: top 5, CV and brief links, cost] --> GM[Gmail]
```

## Workflow B: Manual Job Webhook

```mermaid
flowchart LR
    W[POST /job-score + token] --> V[Validate] --> C[Score with Claude] --> P[Parse JSON]
    P --> GEN[[Generate CV: workflow D]] --> BR[[Generate brief: workflow E]] --> GS[(Append to sheet, with links)] --> R[Respond: score + links]
    V -- invalid --> R4[Respond 400]
```

## Workflow D: Generate Tailored CV (sub-workflow)

```mermaid
flowchart TD
    T[Called by A or B] --> CFG[CV config: threshold, cap, model, paths]
    CFG --> SEL[Select jobs: score 50+, no CV, max 10, best first]
    SEL --> RP[Read about-me.md, read-only] --> PP[Parse profile into fact IDs]
    PP --> RT[Read CV template] --> BR[Build request: rules + facts, job as untrusted text]
    BR --> CL[Claude: JSON schema, cites fact IDs]
    CL --> VAL[Validate: real IDs, no new numbers, no not-yet-learned terms; render HTML]
    VAL --> PDF[Gotenberg: HTML to A4 PDF] --> PG{Over 2 pages?}
    PG -- yes --> SH[Shorten + render] --> PDF2[Gotenberg again] --> RDY
    PG -- no --> RDY[PDF ready]
    RDY --> FF[Find or create Drive folder] --> UPL[Upload PDF] --> NM[Name + move into folder]
    NM --> RES[CV results: link, notes, tokens, cost]
    CL & VAL & PDF & PDF2 & UPL & NM -. failure .-> RES
```

Every failure path joins one Merge node, so each selected job gets exactly one result: a CV link, or `CV failed (attempt n) at <step>: <reason>`, which is retried on the next run.

## Workflow E: Generate Job Brief (sub-workflow)

```mermaid
flowchart TD
    T[Called by A or B] --> CFG[Brief config] --> SEL[Select jobs: has a CV, no brief, max 10]
    SEL --> Q{From Reed?}
    Q -- yes --> RD[Reed job details API: full listing] --> RT
    Q -- no --> RT[Read brief template]
    RT --> BR[Build request: listing as untrusted text] --> CL[Claude: JSON schema, a quote per fact]
    CL --> CH[Check quotes and numbers; render HTML] --> PDF[Gotenberg: HTML to PDF]
    PDF --> UPL[Upload to the same Drive folder] --> RES[Brief results: link, tokens, cost]
    CL & CH & PDF & UPL -. failure .-> RES
```

## Workflow C: Error Alerts

```mermaid
flowchart LR
    E[Error Trigger] --> G[Gmail alert]
```

## Containers

| Service | Image | Network | Notes |
|---|---|---|---|
| n8n | `n8nio/n8n:2.48.5` | `127.0.0.1:5678` only | Read-only mounts: `PRIVATE_DIR` (profile) and `templates/`. File access limited to those two. |
| gotenberg | `gotenberg/gotenberg:8.40.0` | internal only | JavaScript disabled. Reached at `http://gotenberg:3000`. |

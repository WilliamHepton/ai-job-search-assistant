# Privacy Policy

_Last updated: 27 November 2026_

AI Job-Search Assistant is a personal automation project. It is run by its owner, for its owner only, and is not offered as a service to anyone else.

## What the app accesses

The app uses Google OAuth to access the owner's own Google account, with these permissions only:

- **Google Sheets:** read and append rows in the owner's job-tracking spreadsheet.
- **Gmail (send/compose):** send the daily job digest and error alerts to the owner's own address. The app does not read, search or delete email.
- **Google Drive (`drive.file` only):** save the generated CV and job brief PDFs to a folder the app created. The app cannot see any other files in the owner's Drive.

## What data is processed

- Public job listings fetched from job-board APIs (Adzuna and Reed).
- Job listings the owner submits manually through the app's webhook.
- A short skills profile, used to score how well each job fits, and a fact list used to tailor CVs. Contact details are never sent to the AI.

Job listings and the profile are sent to the Anthropic Claude API for scoring and tailoring. Job locations are sent to postcodes.io to work out distances. Results are stored in the owner's own Google Sheet and Drive.

## What the app does not do

- It does not collect data from any other person.
- It does not sell, share or advertise with any data.
- It does not store Google data anywhere other than the owner's own Google account and the owner's self-hosted n8n instance.

## Contact

Questions about this project can be raised as an issue on the [GitHub repository](https://github.com/WilliamHepton/ai-job-search-assistant).

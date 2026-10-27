# Roadie

**Find your audience. Route the tour.** A potential entry for the [Qloo Agentic Hackathon](https://qloo.devpost.com/): a tour-planning workflow for independent musicians, designed to combine cultural affinity with practical travel constraints.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Project status

An existing Next.js prototype with a tour planner, route map, promoter pitch drafts, tool execution trace, and example comparisons. **This is a development scaffold, not a submission-ready demonstration of live Qloo recommendations.**

The Qloo client attempts live requests when configured, but its endpoints and response mapping still need validation against the assigned Qloo API. Missing credentials or unsuccessful responses fall back to bundled or generated sample data. Local taste suggestions are currently sample/generated data. Some venue names, contacts, capacities, and scores are synthesized. The UI does not yet reliably distinguish these sources.

“The Receipts” displays fixed comparison fixtures, not a reproducible experiment against a live LLM. Do not cite its accuracy figures as measured results. See the [readiness checklist](docs/READINESS.md) for the remaining work.

## Why Qloo belongs here

The hypothesis: cultural affinity can surface relevant tour markets that a population-based shortlist misses. Qloo should supply the artist identity and taste evidence that changes market selection; the routing engine should turn those candidates into a workable itinerary. Removing Qloo should measurably change the recommendations. That hypothesis still needs a live integration and controlled evaluation.

## Run locally

Use Node.js 24 and npm. With nvm, run `nvm use`.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). The planner initially loads Geese, November 6–20, 2026, US East, club rooms. Without credentials this exercises the sample workflow only.

For live integration work, obtain a key through the [Qloo developer guide](https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide#getting-your-api-key). Store credentials only in `.env.local` or the deployment's server environment. Configure the base URL assigned to your key and validate the client's endpoint paths before treating any output as live evidence.

| Variable | Current use |
| --- | --- |
| `QLOO_API_KEY` | Attempted Qloo audience-affinity lookup; required for the intended submission |
| `QLOO_BASE_URL` | API base URL; existing client defaults to `https://api.qloo.com/v1`, which remains unvalidated |
| `TICKETMASTER_API_KEY` | Optional venue lookup |
| `TAVILY_API_KEY` | Optional web enrichment for venue contacts, openers, and conflicts |

No LLM provider or Setlist.fm client is currently implemented. Adding their keys does not enable those capabilities.

## Code map

```text
src/app/                 Next.js pages and server API routes
src/components/          Planner, map, trace, pitch, and comparison UI
src/lib/agent/           Deterministic five-tool workflow and preconditions
src/lib/qloo/            Qloo adapter and bundled sample data
src/lib/venues/          Ticketmaster adapter and venue samples
src/lib/tavily/          Optional live web enrichment
src/lib/routing/         Distance estimates, stop ordering, and schedule
src/lib/backtest/        Fixed example comparison fixtures
src/types/              Shared domain types
tests/                  Playwright UI and API smoke tests
docs/                   Hackathon brief, submission draft, readiness plan
```

The workflow discovers markets, finds venues, builds a schedule, enriches local suggestions, and drafts promoter pitches. It records five tool steps. It is deterministic orchestration, not an LLM reasoning loop. Pitches are drafts; the app does not send outreach or book venues. Distances are estimates, not road-network navigation.

## Validation

```bash
npm run check
npm run build
npx playwright install chromium
npm run test:e2e
```

CI runs these checks against the sample workflow without API secrets. Passing tests establishes prototype behavior, not live integration correctness or recommendation quality. To smoke-test a deployment:

```bash
BASE_URL=https://your-deployment.example npm run test:e2e
```

## Hackathon and publishing

- [Hackathon brief](docs/HACKATHON.md): requirements and intended MVP.
- [Submission draft](docs/SUBMISSION.md): editable project description and judge walkthrough.
- [Readiness checklist](docs/READINESS.md): live-data, evaluation, and publishing gates.

Deploy with a Next.js-compatible Node.js host using `npm run build` and `npm start`, or connect the repository to Vercel. For Vercel CLI deployment, install `npm i -g vercel`, link the project, configure server environment variables, and verify a preview before publishing production. The final demo must be publicly accessible; add its verified URL to the submission draft. Repository visibility and deployment availability have not been verified by this scaffold.

## License

[MIT](LICENSE).

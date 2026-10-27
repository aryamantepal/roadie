# Submission readiness

This tracks a potential submission, not a claim that the app is ready. Check items only with evidence.

## Repository scaffold

- [x] Next.js application, typed domain models, server routes, and planner UI exist.
- [x] Routing workflow, execution trace, and draft-pitch interface exist.
- [x] MIT license, environment template, setup instructions, and hackathon docs exist.
- [x] Local lint/typecheck/build/E2E commands and CI workflow are defined.

## Required live behavior

- [ ] Validate the Qloo base URL and endpoint paths with the assigned key. Current code uses `/entities` and `/insights/location`; do not assume these match the provisioned API.
- [ ] Resolve artists to Qloo entity IDs; handle ambiguity and unsupported artists explicitly.
- [ ] Map documented responses without inventing absent affinity scores, coordinates, or index ratios.
- [ ] Attach provenance to every recommendation and show live/sample/unavailable states in the UI and trace. A configured key alone does not prove a live result.
- [ ] Replace silent Qloo fallbacks with clear failures for the submission's live path. Keep any sample exploration distinctly labeled.
- [ ] Replace or label generated openers, pop-up locations, venue names, capacities, and contacts. Verify facts before placing them in pitch drafts.
- [ ] Validate request bodies, real calendar dates, ordered date ranges, region/tier enums, and reasonable window lengths. Return actionable errors in the UI.
- [ ] Bound external calls with timeouts and handle rate limits; confirm one full run fits the host's limits.

## Routing and evidence

- [ ] Verify daily travel limits, rest cadence, start-city handling, date boundaries, and region filtering with meaningful cases.
- [ ] Clearly label geographic mileage as an estimate; do not imply road travel or venue availability was verified.
- [ ] Label or remove the fixed “Receipts” comparisons in the UI before presenting them to judges.
- [ ] Run a controlled Qloo-versus-baseline comparison and store reproducible inputs, source references, and results. Do not reuse the hardcoded accuracy claims as measurements.
- [ ] Complete one end-to-end live run and inspect all displayed claims and source links.

## Publish and submit

- [ ] Run `npm ci`, `npm run check`, `npm run build`, and `npm run test:e2e` from a clean checkout (install Chromium first).
- [ ] Publish a production deployment with server-side credentials and sufficient API quota.
- [ ] Verify the demo in a signed-out browser; it must be externally accessible for judges.
- [ ] Run `BASE_URL=https://your-demo.example npm run test:e2e` and separately verify live Qloo behavior. Smoke tests alone do not prove it.
- [ ] Confirm the source repository is public, contains no credentials, and displays the MIT license.
- [ ] Add the verified demo URL and final description to [SUBMISSION.md](SUBMISSION.md).
- [ ] Confirm team details and eligibility against the [official rules](https://qloo.devpost.com/rules).
- [ ] Submit the completed Devpost entry before October 30, 2026, 11:45 p.m. EDT; retain the confirmation.
- [ ] Keep the app and API access available through judging.

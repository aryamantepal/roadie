# Qloo Agentic Hackathon brief

Working entry: **Roadie — Find your audience. Route the tour.**

## Submission requirements

Deadline: **October 30, 2026, 11:45 p.m. EDT** (October 31, 03:45 UTC). The [official rules](https://qloo.devpost.com/rules), checked October 26, specify a working Qloo-integrated application with an agentic tool or workflow, a functional demo link, a public source repository with an open-source license, and a written description. Keep the demo available through judging, which ends November 5. Check the rules for eligibility and any updates before entering.

The supplied challenge overview additionally calls for an externally published demo and says a video is not required. The MIT license already exists in this repository; public visibility and license detection still need verification.

## Product hypothesis

Independent musicians need to choose where to play before they can optimize a route. City size alone is an incomplete proxy for audience fit. Roadie aims to use Qloo cultural evidence to select markets, then apply deterministic travel constraints to make the shortlist usable.

Target user: an independent artist or manager planning a small US club tour.

Core journey:

1. Enter an artist, date range, region, starting city, and room-size tier.
2. Resolve the artist to a Qloo entity; ask the user to disambiguate when necessary.
3. Retrieve supported cultural/location signals and rank candidate markets with source evidence.
4. Match venues, order stops, and insert travel/rest days.
5. Explain the selections and prepare editable promoter pitch drafts.

## MVP boundaries

Keep the existing planner, map, and trace. Prioritize one proven live Qloo flow and a small supported region over expanding features. Recommendations must carry provenance and uncertainty; unknown venue availability, capacity, contacts, and opener location must remain unknown until verified.

No automatic booking, outreach, payment handling, or ticket-sales guarantees. The deterministic workflow is the current agentic mechanism; do not describe it as using an LLM or agent framework that is absent from the code.

## Demonstrating the difference

Use the same artist inputs, candidate cities, dates, and route constraints for both a population-ranked baseline and a live Qloo-ranked variant. Save the inputs, source timestamps, scoring method, and results. If adding an LLM baseline, record the model and exact prompt. Show which markets changed and why. Label distance estimates and separate routing feasibility from recommendation relevance.

The current comparison fixtures do not validate this hypothesis. Historical tour overlap alone also does not establish ticket demand or causal improvement.

## Suggested build sequence

| Date (Eastern) | Deliverable |
| --- | --- |
| October 26 | Repo scaffold, scoped MVP, evidence inventory |
| October 27 | Validate Qloo entity resolution and supported insights flow |
| October 28 | Provenance, explicit failure states, input validation |
| October 29 | Controlled comparison, public preview, judge walkthrough |
| October 30 | Verify public demo/repo/license, finalize description, submit before deadline |

Start with the [readiness checklist](READINESS.md). Request API access via the [Qloo developer guide](https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide#getting-your-api-key).

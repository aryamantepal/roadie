# Roadie submission draft

Status: **potential submission — not ready to submit**. Replace pending fields and update the description after the live integration is verified.

## Links

- Public demo: https://roadie-seven-mu.vercel.app
- Source: https://github.com/aryamantepal/roadie (public visibility not verified)
- License: [MIT](../LICENSE)
- Team / contributors: **pending**

## Tagline

Find your audience. Route the tour.

## Description

Roadie is a tour-planning prototype for independent musicians. An artist or manager enters an artist name, a date window, a region, and a room-size tier. A deterministic tool workflow selects candidate markets, matches venues, orders stops, adds travel and rest days, and drafts promoter inquiries. The interface includes an itinerary, route map, and execution trace.

The intended Qloo-powered differentiator is market selection based on cultural affinity. Instead of assuming the largest cities are the best places to play, Roadie aims to connect an artist's taste profile to suitable markets and explain those choices with evidence. Travel planning then turns those recommendations into an itinerary.

The current prototype contains Qloo request code and sample-data fallbacks. Live endpoint compatibility, response mapping, and recommendation provenance still require validation. Local suggestions and comparison metrics currently include fixed or generated examples. They are not evidence of measured Qloo performance.

## Built with

Next.js 16, React 19, TypeScript, a Qloo adapter, optional Ticketmaster and Tavily integrations, deterministic geographic routing, Mermaid, and Playwright. There is no implemented LLM provider or Setlist.fm client.

## Judge walkthrough draft

1. Open the public demo once its URL is verified.
2. Enter a supported artist and a two-week date window; select US East and club rooms.
3. Generate a tour and inspect the itinerary and route estimates.
4. Open the execution trace to review market selection and tool outputs.
5. Inspect a promoter pitch draft; no message is sent.
6. After the evidence work is complete, compare the live Qloo market shortlist with the controlled baseline.

Before submission, replace this draft's development caveats with an accurate account of the shipped behavior and remaining limitations. Keep any sample output explicitly labeled.

## Evidence to attach or link

- Verified live Qloo request/response example with secrets removed and usage rights checked.
- Example where Qloo changes the shortlist, with source and explanation.
- Reproducible comparison inputs and results; no fixture-derived accuracy claims.
- Public demo smoke-test result and commit identifier.
- Work completed during the hackathon, especially if building on earlier work.

## Submission status

Use [READINESS.md](READINESS.md) to track completion. Creating this file does not register a team, publish an app, change repository visibility, or submit a Devpost entry.

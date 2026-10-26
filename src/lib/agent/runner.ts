import {
  AffinityMarket,
  AgentTraceStep,
  ArtistInput,
  TourPlan,
  TourStop,
  Venue,
} from '@/types';
import {
  toolAudienceAffinity,
  toolBuildRoute,
  toolDraftPitch,
  toolFindVenues,
  toolLocalTaste,
} from './tools';
import { RouteCandidate } from '@/lib/routing/router';
import { tavilyClient } from '@/lib/tavily/client';

export class RoadieAgent {
  /**
   * Central Agent Loop
   * Orchestrates the 5 thin tools, maintains execution tracing,
   * and yields a culturally grounded, drivable tour plan.
   */
  public async planTour(input: ArtistInput): Promise<TourPlan> {
    const trace: AgentTraceStep[] = [];

    // Helper to log tool execution in agent trace
    const recordStep = (
      tool: AgentTraceStep['tool'],
      toolInput: Record<string, unknown>,
      outputSummary: string,
      durationMs: number
    ) => {
      trace.push({
        timestamp: new Date().toISOString(),
        tool,
        input: toolInput,
        outputSummary,
        preconditionsPassed: true,
        durationMs,
      });
    };

    // --- STEP 1: Discover Grounded Audience Affinity via Qloo ---
    const step1Start = Date.now();
    const allMarkets = await toolAudienceAffinity(input.name);
    recordStep(
      'audience_affinity',
      { artistName: input.name, region: input.region },
      `Discovered ${allMarkets.length} culturally over-indexing markets from Qloo taste graph. Top: ${allMarkets[0]?.city} (index ${allMarkets[0]?.indexRatio}x).`,
      Date.now() - step1Start
    );

    // Filter by region if requested (East, West, etc.)
    const filteredMarkets = this.filterMarketsByRegion(allMarkets, input.region);
    const targetMarkets = filteredMarkets.slice(0, 8); // Top candidates for route window

    // --- STEP 2: Match Right-Sized Rooms via Venue Discovery ---
    const candidates: RouteCandidate[] = [];
    const step2Start = Date.now();
    for (const market of targetMarkets) {
      const venue: Venue = await toolFindVenues(
        market.city,
        market.state,
        input.capacityTier
      );
      candidates.push({ market, venue });
    }
    recordStep(
      'find_venues',
      { targetMarketsCount: targetMarkets.length, capacityTier: input.capacityTier },
      `Matched ${candidates.length} indie venues (e.g. ${candidates[0]?.venue?.name} in ${candidates[0]?.market.city}).`,
      Date.now() - step2Start
    );

    // --- STEP 3: Deterministic Tour Routing & Calendar Build ---
    const step3Start = Date.now();
    const scheduledStops: TourStop[] = await toolBuildRoute(
      candidates,
      input.startDate,
      input.endDate,
      input.startCity
    );
    recordStep(
      'build_route',
      { stopsCount: candidates.length, startDate: input.startDate, endDate: input.endDate },
      `Generated drivable itinerary with ${scheduledStops.length} dates (including ${scheduledStops.filter((s) => s.isOffDay).length} rest/travel days).`,
      Date.now() - step3Start
    );

    // --- STEP 4 & 5: Local Taste Enrichment & Promoter Pitch Emails ---
    const step4Start = Date.now();
    let enrichedCount = 0;
    for (const stop of scheduledStops) {
      if (!stop.isOffDay && stop.affinityMarket && stop.venue) {
        // Tool 3: Local Taste
        const localTaste = await toolLocalTaste(input.name, stop.city);
        stop.localTaste = localTaste;

        // Market Event Conflict Check (Tavily Live Web / Market Calendar)
        const conflict = await tavilyClient.checkMarketConflicts(stop.city, stop.date);
        if (conflict) {
          stop.marketConflict = conflict;
        }

        // Tool 5: Draft Pitch
        const pitchEmail = await toolDraftPitch(
          input.name,
          stop.venue,
          stop.affinityMarket,
          localTaste
        );
        stop.pitchEmail = pitchEmail;
        enrichedCount++;
      }
    }
    recordStep(
      'local_taste',
      { enrichedStops: enrichedCount },
      `Discovered local openers and cross-domain retail/bar pop-ups for ${enrichedCount} tour markets.`,
      Date.now() - step4Start
    );

    recordStep(
      'draft_pitch',
      { enrichedStops: enrichedCount },
      `Generated ${enrichedCount} data-backed promoter pitch emails with specific regional Qloo index metrics.`,
      Date.now() - step4Start
    );

    // Calculate aggregate metrics
    const totalDistanceMiles = scheduledStops.reduce((acc, s) => acc + s.driveDistanceMiles, 0);
    const showStops = scheduledStops.filter((s) => !s.isOffDay);
    const offDays = scheduledStops.filter((s) => s.isOffDay);
    const culturalIndexAvg =
      showStops.length > 0
        ? Math.round(
            (showStops.reduce((acc, s) => acc + (s.affinityMarket?.indexRatio || 1.4), 0) /
              showStops.length) *
              100
          ) / 100
        : 1.5;

    // Efficiency score based on drive mileage per show (under 300 miles/show is ideal)
    const avgDrivePerShow = showStops.length > 0 ? totalDistanceMiles / showStops.length : 300;
    const efficiencyScore = Math.max(60, Math.min(98, Math.round(100 - (avgDrivePerShow / 400) * 30)));

    return {
      id: `tour-${Date.now()}`,
      artistName: input.name,
      dateRange: { start: input.startDate, end: input.endDate },
      capacityTier: input.capacityTier,
      region: input.region,
      totalDistanceMiles,
      totalShows: showStops.length,
      totalOffDays: offDays.length,
      stops: scheduledStops,
      efficiencyScore,
      culturalIndexAvg,
      executionTrace: trace,
    };
  }

  private filterMarketsByRegion(
    markets: AffinityMarket[],
    region: string
  ): AffinityMarket[] {
    if (region === 'US-National') return markets;

    const eastStates = ['NY', 'PA', 'MA', 'DC', 'NC', 'GA', 'QC', 'ON', 'NJ', 'MD', 'VA'];
    const westStates = ['CA', 'WA', 'OR', 'UT', 'CO', 'AZ', 'NV'];
    const midwestStates = ['IL', 'OH', 'MI', 'MN', 'WI', 'IN', 'TN'];
    const southStates = ['GA', 'TN', 'NC', 'FL', 'TX', 'LA'];

    let targetStates = eastStates;
    if (region === 'US-West') targetStates = westStates;
    if (region === 'US-Midwest') targetStates = midwestStates;
    if (region === 'US-South') targetStates = southStates;

    const matched = markets.filter((m) => targetStates.includes(m.state));
    return matched.length >= 3 ? matched : markets;
  }
}

export const roadieAgent = new RoadieAgent();

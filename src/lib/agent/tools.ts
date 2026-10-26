import {
  AffinityMarket,
  CapacityTier,
  LocalTaste,
  TourStop,
  Venue,
} from '@/types';
import { qlooClient } from '@/lib/qloo/client';
import { findVenuesForMarket } from '@/lib/venues/discovery';
import { buildTourSchedule, optimizeStopSequence, RouteCandidate } from '@/lib/routing/router';

/**
 * 5 Thin Tools for Roadie Agent
 * In accordance with Roadie architectural principles, preconditions are enforced
 * INSIDE the tools themselves rather than in an external rigid pipeline.
 */

// Tool 1: audience_affinity
export async function toolAudienceAffinity(
  artistName: string
): Promise<AffinityMarket[]> {
  // Precondition checks inside the tool
  if (!artistName || typeof artistName !== 'string' || artistName.trim().length === 0) {
    throw new Error("Precondition failed: 'artistName' must be a non-empty string.");
  }

  const markets = await qlooClient.getAudienceAffinity(artistName.trim());
  if (!markets || markets.length === 0) {
    throw new Error(`Precondition failed: No affinity markets found for '${artistName}'.`);
  }

  return markets;
}

// Tool 2: find_venues
export async function toolFindVenues(
  city: string,
  state: string,
  capacityTier: CapacityTier
): Promise<Venue> {
  // Precondition checks inside the tool
  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    throw new Error("Precondition failed: 'city' must be a non-empty string.");
  }
  if (!state || typeof state !== 'string') {
    throw new Error("Precondition failed: 'state' must be provided.");
  }
  const validTiers: CapacityTier[] = ['club', 'ballroom', 'theater'];
  if (!validTiers.includes(capacityTier)) {
    throw new Error(`Precondition failed: Invalid capacity tier '${capacityTier}'. Must be club, ballroom, or theater.`);
  }

  return await findVenuesForMarket(city.trim(), state.trim(), capacityTier);
}

// Tool 3: local_taste
export async function toolLocalTaste(
  artistName: string,
  city: string
): Promise<LocalTaste> {
  // Precondition checks inside the tool
  if (!artistName || artistName.trim().length === 0) {
    throw new Error("Precondition failed: 'artistName' must be provided to evaluate cultural taste.");
  }
  if (!city || city.trim().length === 0) {
    throw new Error("Precondition failed: 'city' must be provided for cross-domain taste mapping.");
  }

  return await qlooClient.getLocalTaste(artistName.trim(), city.trim());
}

// Tool 4: build_route
export async function toolBuildRoute(
  candidates: RouteCandidate[],
  startDate: string,
  endDate: string,
  startCity?: string
): Promise<TourStop[]> {
  // Precondition checks inside the tool
  if (!Array.isArray(candidates) || candidates.length < 2) {
    throw new Error('Precondition failed: At least 2 candidate markets required to build a drivable route.');
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Precondition failed: 'startDate' and 'endDate' must be valid ISO date strings.");
  }
  if (end.getTime() < start.getTime()) {
    throw new Error("Precondition failed: 'endDate' cannot precede 'startDate'.");
  }

  // 1. Optimize sequence using deterministic TSP heuristic
  const orderedCandidates = optimizeStopSequence(candidates, startCity);

  // 2. Schedule dates with realistic band off-days and driving limits
  return buildTourSchedule(orderedCandidates, startDate, endDate);
}

// Tool 5: draft_pitch
export async function toolDraftPitch(
  artistName: string,
  venue: Venue,
  market: AffinityMarket,
  localTaste: LocalTaste
): Promise<string> {
  // Precondition checks inside the tool
  if (!artistName) {
    throw new Error("Precondition failed: 'artistName' missing for pitch generation.");
  }
  if (!venue || !venue.name || venue.capacity <= 0) {
    throw new Error("Precondition failed: Valid venue with capacity required to draft promoter pitch.");
  }
  if (!market || market.affinityScore <= 0) {
    throw new Error("Precondition failed: Grounded market affinity data required to draft data-backed pitch.");
  }

  const indexPercent = Math.round((market.indexRatio - 1) * 100);
  const percentText = indexPercent > 0 ? `+${indexPercent}% above national average` : 'top-tier regional affinity';

  return `Subject: Tour Hold Inquiry: ${artistName} at ${venue.name} (${venue.city}) - Grounded Affinity Data

Hi ${venue.name} Booking Team,

I represent ${artistName}. We are routing our upcoming headline tour and are requesting a hold for ${venue.name} (${venue.capacity} cap).

Why this date is a guaranteed sellout in ${market.city}:
1. Cultural Affinity Data (Qloo Taste Graph):
   - ${market.city} ranks #${market.rank} nationally for ${artistName}, indexing at ${percentText} (${market.affinityScore}/100 affinity score).
   - Core neighborhood concentration: ${market.topNeighborhoods.join(', ')}.
   - Shared audience overlap locally: ${market.similarArtistsLocally.join(', ')}.

2. Local Market Activation:
   - Proposed local co-bill / support: ${localTaste.opener.name} (${localTaste.opener.genre}), who currently holds ${localTaste.opener.affinityMatch}% fan overlap in ${market.city}.
   - Promotional partner / Pop-up: ${localTaste.popUpSpot.name} (${localTaste.popUpSpot.neighborhood}) will host an afternoon record pop-up & ticket giveaway.

Given our capacity target (${venue.capacity} cap) and verified regional demand, we project a rapid advance sellout.

Please let us know your availability for our target window or preferred hold dates.

Best regards,
Roadie Tour Management
on behalf of ${artistName}
Powered by Qloo Cultural Intelligence`;
}

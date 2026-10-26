import { AffinityMarket, TourStop, Venue } from '@/types';

// Approximate road distance factor over straight line Haversine distance
const ROAD_DETOUR_FACTOR = 1.22;
const AVERAGE_HIGHWAY_MPH = 55;
const MAX_CONSECUTIVE_SHOWS = 3;
const MAX_DRIVE_MILES_WITHOUT_OFFDAY = 320;

export interface RouteCandidate {
  market: AffinityMarket;
  venue?: Venue;
}

export function haversineDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * ROAD_DETOUR_FACTOR;
}

/**
 * Optimizes the sequence of candidate stops using Nearest Neighbor + 2-Opt TSP heuristic.
 */
export function optimizeStopSequence(candidates: RouteCandidate[], startCity?: string): RouteCandidate[] {
  if (candidates.length <= 2) return [...candidates];

  // Pick start index
  let startIndex = 0;
  if (startCity) {
    const found = candidates.findIndex(
      (c) => c.market.city.toLowerCase() === startCity.toLowerCase()
    );
    if (found !== -1) startIndex = found;
  } else {
    // Pick the most culturally relevant anchor market or easternmost/westernmost anchor
    const sortedByAffinity = [...candidates].sort((a, b) => b.market.affinityScore - a.market.affinityScore);
    startIndex = candidates.indexOf(sortedByAffinity[0]);
  }

  const unvisited = [...candidates];
  const ordered: RouteCandidate[] = [];

  let current = unvisited.splice(startIndex, 1)[0];
  ordered.push(current);

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = haversineDistanceMiles(
        current.market.lat,
        current.market.lng,
        unvisited[i].market.lat,
        unvisited[i].market.lng
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = i;
      }
    }

    current = unvisited.splice(nearestIdx, 1)[0];
    ordered.push(current);
  }

  // 2-Opt local search refinement to uncross edges
  return twoOptRefine(ordered);
}

function twoOptRefine(route: RouteCandidate[]): RouteCandidate[] {
  let improved = true;
  let bestRoute = [...route];

  function calculateTotalDistance(path: RouteCandidate[]): number {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      total += haversineDistanceMiles(
        path[i].market.lat,
        path[i].market.lng,
        path[i + 1].market.lat,
        path[i + 1].market.lng
      );
    }
    return total;
  }

  let bestDistance = calculateTotalDistance(bestRoute);

  let iterations = 0;
  while (improved && iterations < 50) {
    improved = false;
    iterations++;

    for (let i = 1; i < bestRoute.length - 1; i++) {
      for (let k = i + 1; k < bestRoute.length; k++) {
        const newRoute = twoOptSwap(bestRoute, i, k);
        const newDist = calculateTotalDistance(newRoute);

        if (newDist < bestDistance - 5) {
          bestRoute = newRoute;
          bestDistance = newDist;
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  return bestRoute;
}

function twoOptSwap(route: RouteCandidate[], i: number, k: number): RouteCandidate[] {
  const result: RouteCandidate[] = [];
  // 1. take route[0] to route[i-1] and add them in order
  for (let c = 0; c <= i - 1; c++) {
    result.push(route[c]);
  }
  // 2. take route[i] to route[k] and add them in reverse order
  for (let c = k; c >= i; c--) {
    result.push(route[c]);
  }
  // 3. take route[k+1] to end and add in order
  for (let c = k + 1; c < route.length; c++) {
    result.push(route[c]);
  }
  return result;
}

/**
 * Builds a drivable, realistic tour schedule with calendar dates, off-days, and driving metrics.
 */
export function buildTourSchedule(
  orderedCandidates: RouteCandidate[],
  startDateStr: string,
  endDateStr: string
): TourStop[] {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const totalDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  const stops: TourStop[] = [];
  let currentDate = new Date(startDate);
  let candidateIndex = 0;
  let consecutiveShows = 0;
  let prevLat = orderedCandidates[0]?.market.lat;
  let prevLng = orderedCandidates[0]?.market.lng;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let day = 0; day < totalDays && candidateIndex < orderedCandidates.length; day++) {
    const candidate = orderedCandidates[candidateIndex];
    const isFirstStop = stops.length === 0;

    const driveMiles = isFirstStop
      ? 0
      : Math.round(haversineDistanceMiles(prevLat, prevLng, candidate.market.lat, candidate.market.lng));
    const driveHours = isFirstStop ? 0 : Math.round((driveMiles / AVERAGE_HIGHWAY_MPH) * 10) / 10;

    // Check if off-day is needed before playing this market
    const needsOffDay =
      !isFirstStop &&
      (consecutiveShows >= MAX_CONSECUTIVE_SHOWS || driveMiles > MAX_DRIVE_MILES_WITHOUT_OFFDAY);

    if (needsOffDay) {
      // Insert travel / off-day
      const dateString = currentDate.toISOString().split('T')[0];
      const dayName = daysOfWeek[currentDate.getUTCDay()];

      stops.push({
        stopNumber: stops.length + 1,
        date: dateString,
        dayOfWeek: dayName,
        isOffDay: true,
        city: `En Route to ${candidate.market.city}`,
        state: candidate.market.state,
        lat: (prevLat + candidate.market.lat) / 2,
        lng: (prevLng + candidate.market.lng) / 2,
        driveDistanceMiles: Math.round(driveMiles / 2),
        driveHours: Math.round((driveHours / 2) * 10) / 10,
        notes: `Travel & recovery day. Rest before the ${candidate.market.city} show.`,
      });

      consecutiveShows = 0;
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      day++;
      if (day >= totalDays) break;
    }

    // Schedule the show stop
    const dateString = currentDate.toISOString().split('T')[0];
    const dayName = daysOfWeek[currentDate.getUTCDay()];

    stops.push({
      stopNumber: stops.length + 1,
      date: dateString,
      dayOfWeek: dayName,
      isOffDay: false,
      city: candidate.market.city,
      state: candidate.market.state,
      lat: candidate.market.lat,
      lng: candidate.market.lng,
      venue: candidate.venue,
      affinityMarket: candidate.market,
      driveDistanceMiles: driveMiles,
      driveHours: driveHours,
    });

    prevLat = candidate.market.lat;
    prevLng = candidate.market.lng;
    consecutiveShows++;
    candidateIndex++;
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return stops;
}

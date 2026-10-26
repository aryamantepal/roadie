export type CapacityTier = 'club' | 'ballroom' | 'theater';
export type TourRegion = 'US-National' | 'US-East' | 'US-West' | 'US-Midwest' | 'US-South';

export interface ArtistInput {
  name: string;
  startDate: string;
  endDate: string;
  region: TourRegion;
  capacityTier: CapacityTier;
  startCity?: string;
}

export interface AffinityMarket {
  city: string;
  state: string;
  lat: number;
  lng: number;
  affinityScore: number; // 0 - 100
  indexRatio: number; // e.g. 1.48 (48% above national average)
  rank: number;
  topNeighborhoods: string[];
  tasteArchetype: string;
  similarArtistsLocally: string[];
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  capacity: number;
  lat: number;
  lng: number;
  bookingContact: string;
  vibe: string;
  source: 'ticketmaster' | 'curated_network';
}

export interface LocalOpener {
  name: string;
  genre: string;
  affinityMatch: number;
  rationale: string;
}

export interface PopUpSpot {
  name: string;
  category: 'record_store' | 'craft_bar' | 'indie_cafe';
  neighborhood: string;
  culturalMatch: string;
  crossDomainEntityId?: string;
}

export interface LocalTaste {
  city: string;
  opener: LocalOpener;
  popUpSpot: PopUpSpot;
}

export interface MarketConflict {
  hasConflict: boolean;
  conflictSummary?: string;
  sourceUrl?: string;
}

export interface TourStop {
  stopNumber: number;
  date: string;
  dayOfWeek: string;
  isOffDay: boolean;
  city: string;
  state: string;
  lat: number;
  lng: number;
  venue?: Venue;
  affinityMarket?: AffinityMarket;
  localTaste?: LocalTaste;
  marketConflict?: MarketConflict;
  driveDistanceMiles: number;
  driveHours: number;
  notes?: string;
  pitchEmail?: string;
}

export interface AgentTraceStep {
  timestamp: string;
  tool: 'audience_affinity' | 'find_venues' | 'local_taste' | 'build_route' | 'draft_pitch';
  input: Record<string, unknown>;
  outputSummary: string;
  preconditionsPassed: boolean;
  durationMs: number;
}

export interface TourPlan {
  id: string;
  artistName: string;
  dateRange: { start: string; end: string };
  capacityTier: CapacityTier;
  region: TourRegion;
  totalDistanceMiles: number;
  totalShows: number;
  totalOffDays: number;
  stops: TourStop[];
  efficiencyScore: number; // 0 - 100
  executionTrace: AgentTraceStep[];
  culturalIndexAvg: number;
}

export interface BacktestCase {
  id: string;
  artist: string;
  tourName: string;
  year: number;
  genre: string;
  description: string;
  groundTruthStops: { city: string; state: string; venue: string; date?: string }[];
  llmBaselineStops: { city: string; state: string; rank: number; rationale: string }[];
  roadieQlooStops: { city: string; state: string; rank: number; affinityScore: number; rationale: string }[];
  llmMetrics: {
    precisionAt10: number; // percentage
    recall: number;
    ndcg10: number;
    wastedTravelMiles: number;
  };
  roadieMetrics: {
    precisionAt10: number; // percentage
    recall: number;
    ndcg10: number;
    wastedTravelMiles: number;
  };
  analysis: string;
  whyQlooWins: string[];
}

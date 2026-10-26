import { NextRequest, NextResponse } from 'next/server';
import { roadieAgent } from '@/lib/agent/runner';
import { ArtistInput } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, startDate, endDate, region, capacityTier, startCity } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: "Missing required parameter 'name' (artist name)." },
        { status: 400 }
      );
    }

    const input: ArtistInput = {
      name: name.trim(),
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate:
        endDate ||
        new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      region: region || 'US-East',
      capacityTier: capacityTier || 'club',
      startCity: startCity || undefined,
    };

    const tourPlan = await roadieAgent.planTour(input);

    return NextResponse.json(tourPlan);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

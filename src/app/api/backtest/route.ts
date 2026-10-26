import { NextRequest, NextResponse } from 'next/server';
import { runBacktestSimulation } from '@/lib/backtest/engine';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const caseId = searchParams.get('caseId') || undefined;

    const result = await runBacktestSimulation(caseId);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

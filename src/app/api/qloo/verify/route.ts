import { NextResponse } from 'next/server';
import { qlooClient } from '@/lib/qloo/client';

export async function GET() {
  try {
    const diagnostic = await qlooClient.verifyConnection();
    return NextResponse.json(diagnostic);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      {
        configured: false,
        connected: false,
        message: msg,
      },
      { status: 500 }
    );
  }
}

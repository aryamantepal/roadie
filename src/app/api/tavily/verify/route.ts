import { NextResponse } from 'next/server';
import { io } from 'next/cache';
import { tavilyClient } from '@/lib/tavily/client';

export async function GET() {
  await io();
  try {
    const status = tavilyClient.getStatus();
    return NextResponse.json(status);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      {
        configured: false,
        message: msg,
      },
      { status: 500 }
    );
  }
}

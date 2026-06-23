import { NextRequest, NextResponse } from 'next/server';

const errors: { timestamp: string; message: string; userAgent: string }[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    errors.push({
      timestamp: new Date().toISOString(),
      message: body.message || 'Unknown error',
      userAgent: req.headers.get('user-agent') || 'unknown',
    });
    console.log('CAPTURED ERROR:', body.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}

export async function GET() {
  return NextResponse.json({ errors });
}

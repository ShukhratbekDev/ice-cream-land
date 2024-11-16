import { NextResponse } from 'next/server';
import * as regions from '@/config/regions.json';

export async function GET() {
  return NextResponse.json(regions);
}

export async function POST(req: Request) {
  const { regionId } = await req.json();

  if (!regionId) {
    return NextResponse.json({ error: 'Please select a region' }, { status: 400 });
  }

  const isValidRegion = regions.some((region) => region.id === regionId);

  if (!isValidRegion) {
    return NextResponse.json({ error: 'Invalid region selected' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

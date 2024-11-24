import { NextResponse } from 'next/server';
import { regions } from '@/config/regions';

export async function GET() {
  return NextResponse.json(regions);
}

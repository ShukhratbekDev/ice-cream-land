import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { likes } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const productId = Number((await params).id);

  await db.insert(likes).values({ userId, productId });

  return new NextResponse('Liked', { status: 201 });
}

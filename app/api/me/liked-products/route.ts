import { NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET() {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const user = await currentUser();

  if (user) {
    const userData = await db.query.users.findFirst({
      where: eq(users.id, user.id),
    });

    if (!userData) {
      await db
        .insert(users)
        .values({ id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName });
    }
  }

  const userData = await db.query.users.findFirst({
    columns: {},
    where: eq(users.id, userId),
    with: { likes: { columns: {}, with: { likedProduct: true } } },
  });

  return NextResponse.json(userData?.likes?.map((like) => like?.likedProduct));
}

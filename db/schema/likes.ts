import { createInsertSchema } from 'drizzle-zod';
import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { products } from '@/db/schema/products';
import { users } from '@/db/schema/users';

export const likes = pgTable(
  'likes',
  {
    userId: varchar()
      .notNull()
      .references(() => users.id),
    productId: integer()
      .notNull()
      .references(() => products.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.productId] }),
  })
);

export const insertLikesSchema = createInsertSchema(likes);

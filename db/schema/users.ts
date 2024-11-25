import { createInsertSchema } from 'drizzle-zod';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar().primaryKey(),
  username: varchar(),
  firstName: varchar(),
  lastName: varchar(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const insertUsersSchema = createInsertSchema(users);

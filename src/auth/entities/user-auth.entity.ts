import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "src/users/entities/user.entity";

export const userAuth = pgTable('user_auth', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => user.id, { onDelete: 'cascade' }),
  authKey: varchar('auth_key', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  isActive: boolean('is_active').default(true),
});
  
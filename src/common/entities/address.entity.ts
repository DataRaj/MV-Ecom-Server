import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { user } from 'src/users/entities/user.entity';

export const address = pgTable('address', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user-id').references(() => user.id, { onDelete: 'set null' }),
  address: varchar('address', { length: 100 }),
  city: varchar('city', { length: 50 }),
  state: varchar('state', { length: 50 }),
  country: varchar('country', { length: 50 }),
  pincode: integer('pincode'),
  createdAt: timestamp('created-at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

// export const addressToOrderRelation = relations(address, ({ many }) => ({
//   orders: many(orders),
// }));


export const addressToUserRelation = relations(address, ({ one }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
}));

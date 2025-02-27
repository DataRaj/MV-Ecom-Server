import { relations } from 'drizzle-orm';
import {
    boolean,
    index,
    integer,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { address } from 'src/common/entities/address.entity';

export const user = pgTable(
  'customer',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    firstname: varchar('firstname', { length: 50 }),
    lastname: varchar('lastname', { length: 50 }),
    mobileNumber: integer('mobile-number').notNull(),
    createdAt: timestamp('created-at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    addressId: uuid('address-id').references(() => address.id, {
      onDelete: 'cascade',
    }),
    email: varchar('email', { length: 50 }),
    emailVerified: boolean('email_verified').notNull().default(false),
    profileIsComplete: boolean('profile-is-complete').default(false),
  },
  (table) => {
    return {
      customerIdIdx: index('customer-id_idx').on(table.id),
      customerMobileNumberIdx: index('customer-mobile-number_idx').on(
        table.mobileNumber,
      ),
    };
  },
);



export const customerToAddress = relations(user, ({ one }) => ({
  address: one(address),
}));

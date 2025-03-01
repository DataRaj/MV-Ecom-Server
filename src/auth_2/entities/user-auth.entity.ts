import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

export const userAuth = pgTable('user_auth', {
  id: text('id').notNull(), // UUID from customer/reseller/retailer table
  phoneNumber: text('phone_number').notNull(),
  provider: text('provider').notNull().default('phone'), // 'phone', 'google', 'facebook'
  userType: text('user_type').notNull(), // 'customer', 'reseller', 'retailer'
  verifiedAt: timestamp('verified_at'), // Null if not verified
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  pk: primaryKey({ columns: [table.id, table.userType] }), // Ensures unique ID per role
}));

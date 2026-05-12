import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name"),
  password: text("password").notNull(),
  credits: integer("credits").default(1).notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  premiumSince: text("premium_since"),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNo: text("order_no").unique().notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  amount: integer("amount").notNull(),
  plan: text("plan").notNull(),
  status: text("status").default("pending").notNull(),
  paidAt: text("paid_at"),
  activatedAt: text("activated_at"),
  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

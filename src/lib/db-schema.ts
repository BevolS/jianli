import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  name: text("name"),
  password: text("password").notNull(),
  credits: integer("credits").default(1).notNull(),
  isPremium: integer("is_premium", { mode: "boolean" }).default(false).notNull(),
  premiumSince: text("premium_since"),
  isAdmin: integer("is_admin", { mode: "boolean" }).default(false).notNull(),
  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderNo: text("order_no").unique().notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  amount: integer("amount").notNull(), // in yuan
  plan: text("plan").notNull(), // e.g. "monthly", "yearly"
  status: text("status").default("pending").notNull(), // pending | paid | activated | cancelled
  paidAt: text("paid_at"),
  activatedAt: text("activated_at"),
  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

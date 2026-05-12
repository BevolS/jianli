import * as schema from "./db-schema";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any;

if (process.env.DATABASE_URL) {
  const { drizzle } = require("drizzle-orm/neon-http");
  const { neon } = require("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql, { schema });
} else {
  const { drizzle } = require("drizzle-orm/better-sqlite3");
  const Database = require("better-sqlite3");
  const sqlite = new Database(path.join(process.cwd(), "data.db"));
  db = drizzle(sqlite, { schema });
}

export { db };

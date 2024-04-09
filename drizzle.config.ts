import * as dotenv from "dotenv";
import { type Config } from "drizzle-kit";
dotenv.config();

// Prod env
export default {
  schema: "./src/lib/db/schema/schema.ts",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? "",
  },
} satisfies Config;

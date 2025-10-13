import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { dbConfig } from "../config/dbConfig.js";

const { Pool } = pg;

const dbClient = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(dbClient, {
  schema: {},
});

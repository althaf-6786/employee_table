import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import fs from 'fs';
import dbConfig from "../config/dbconfig";

const { Pool } = pg

const dbClient = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./ca.pem').toString()
  }
});

export const db = drizzle(dbClient);



import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'
import * as fs from 'fs';
import dbConfig from './src/config/dbconfig';

// dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/*",
  out: "./migrations",
  dbCredentials: {
    host:dbConfig.host!,
    port:dbConfig.port!,
    user:dbConfig.user!,
    password:dbConfig.password!,
    database:dbConfig.database!,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('./ca.pem').toString()
    }
  }
})

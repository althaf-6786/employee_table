import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.HOST!,
    user: process.env.USER!,
    password: process.env.PASSWORD!,
    database: process.env.DB_NAME!,
    port: Number(process.env.PORT),
  };
  
export default dbConfig;
  
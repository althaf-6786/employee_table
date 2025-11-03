import envData from "../env.js";
export const dbConfig = {
    host: envData.DB_HOST,
    port: Number(envData.DB_PORT),
    user: envData.DB_USER,
    password: envData.DB_PASSWORD,
    database: envData.DB_NAME,
};

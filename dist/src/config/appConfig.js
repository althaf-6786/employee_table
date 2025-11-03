import envData from "../env.js";
export const appConfig = {
    port: Number(envData.PORT),
    version: envData.API_VERSION,
};

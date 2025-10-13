import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import type { AppRespData, SuccessResp } from "../types/app.types.js";

export function sendSuccessResp(c: Context, status: ContentfulStatusCode, message: string, data?: AppRespData) {
  const resp: SuccessResp = {
    status,
    success: true,
    message,
  };
  if (data) {
    resp.data = data;
  }
  return c.json(resp, status);
}

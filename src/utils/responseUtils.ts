import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { AppResponseData, SuccessResponseData } from "../types/app.types";


export const sendSuccessResponse = (c: Context, status: StatusCode, message: string, data?: AppResponseData) => {
  let resp: SuccessResponseData = {
    status,
    success: true,
    message,
  };

  if (data) {
    resp.data = data;
  }
  return c.json(resp, status);
};

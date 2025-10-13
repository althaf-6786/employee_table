import type { StatusCode } from "hono/utils/http-status";

import BaseException from "./baseException.js";

class S3ErrorException extends BaseException {
  constructor(status: StatusCode, message: string, errData?: any, isOperational = true) {
    super(status, message, errData, isOperational);
  }
}

export default S3ErrorException;

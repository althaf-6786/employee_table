import { StatusCode } from "hono/utils/http-status";

class BaseException extends Error {
  status: number;
  isOperational: boolean;
  errData: any;

  constructor(status: StatusCode, message: string, name: string, isOperational: boolean, errData?: any) {
    super(message);
    this.status = status;
    this.name = name;
    this.isOperational = isOperational;
    this.errData = errData;
  }
}

export default BaseException
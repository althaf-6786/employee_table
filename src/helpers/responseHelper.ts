import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

export class ResponseHelper {

    static sendSuccessResponse(c: Context, status: StatusCode, message: string = "", data: any = []) {

        let responseBody: any = {
            success: true,
            message,
            status: status,
            data
        }
        c.status(status);
        return c.json(responseBody);

    }

    static sendErrorResponse(c: Context, status: StatusCode, message: string = "", data: any = [], errors = {}) {

        let responseBody: any = {
            success: false,
            message,
            errors,
            status: status,
            data
        };
        c.status(status);
        return c.json(responseBody);

    }

    static sendValidationErrorResponse(c: Context, status: StatusCode, message: string, errors: any) {

        let responseBody: any = {
            success: false,
            status,
            errors,
            message,
            data: null
        }

        c.status(status);
        return c.json(responseBody);
    }

}
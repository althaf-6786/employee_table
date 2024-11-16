import { DEF_409, NAME_409 } from "../constants/appMessages";
import BaseException from "./baseException";

class ConflictException extends BaseException {
  constructor(key: string, message?: string) {

    super(409, message || DEF_409, NAME_409, true);

    // Initialize an error object to store specific error information based on the provided `key` and `message`.
    const errObject: Record<string, string> = {};
    if (key && message) {
      errObject[key] = message;
    }

    // Assign the custom error data to `errData`
    this.errData = errObject;
  }
}

export default ConflictException;

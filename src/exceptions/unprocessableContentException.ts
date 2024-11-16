import { DEF_422, NAME_422 } from "../constants/appMessages";
import BaseException from "./baseException";

class UnprocessableContentException extends BaseException {
  constructor(message?: string, errData?: any) {
    super(422, message || DEF_422, NAME_422, true, errData);
  }
}

export default UnprocessableContentException
import { DEF_422, NAME_422 } from "../constants/appMessages.js";
import BaseException from "./baseException.js";
class UnprocessableContentException extends BaseException {
    constructor(message, errData) {
        super(422, message || DEF_422, NAME_422, true, errData);
    }
}
export default UnprocessableContentException;

import { DEF_409, NAME_409 } from "../constants/appMessages.js";
import BaseException from "./baseException.js";
class ConflictException extends BaseException {
    constructor(message) {
        super(409, message || DEF_409, NAME_409, true);
    }
}
export default ConflictException;

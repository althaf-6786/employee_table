import { DEF_401, NAME_401 } from "../constants/appMessages.js";
import BaseException from "./baseException.js";
class UnauthorizedException extends BaseException {
    constructor(message) {
        super(401, message || DEF_401, NAME_401, true);
    }
}
export default UnauthorizedException;

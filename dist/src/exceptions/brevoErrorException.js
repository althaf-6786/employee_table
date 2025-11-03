import BaseException from "./baseException.js";
class BrevoErrorException extends BaseException {
    constructor(status, message, name, isOperational, errData) {
        super(status, message, name, isOperational, errData);
    }
}
export default BrevoErrorException;

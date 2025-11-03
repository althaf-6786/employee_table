import BaseException from "./baseException.js";
class S3ErrorException extends BaseException {
    constructor(status, message, errData, isOperational = true) {
        super(status, message, errData, isOperational);
    }
}
export default S3ErrorException;

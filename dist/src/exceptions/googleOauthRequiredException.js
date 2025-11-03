// exceptions/googleOAuthReauthRequiredException.js
import BaseException from "./baseException.js";
export default class GoogleOAuthReauthRequiredException extends BaseException {
    constructor(message, errData) {
        super(401, message, "GoogleOAuthReauthRequiredException", true, errData);
    }
}

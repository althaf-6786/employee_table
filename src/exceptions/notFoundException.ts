import { DEF_404, NAME_404 } from "../constants/appMessages.js";
import BaseException from "./baseException.js";

class NotFoundException extends BaseException {
  constructor(message?: string) {
    super(404, message || DEF_404, NAME_404, true);
  }
}

export default NotFoundException;

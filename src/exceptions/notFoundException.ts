import { DEF_404, NAME_404 } from "../constants/appMessages";
import BaseException from "./baseException";

class NotFoundException extends BaseException {
  constructor(message?: string) {
    super(404, message || DEF_404, NAME_404, true)
  }
}

export default NotFoundException
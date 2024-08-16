import { ApiError } from "./ApiError.js";

class InternalServerError extends ApiError {
  constructor() {
    super("Internal server Error", 500);
  }
}

export { InternalServerError };

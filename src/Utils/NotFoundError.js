import { ApiError } from "./ApiError.js";

class NotFoundError extends ApiError {
  constructor(resource) {
    super(`the ${resource} not found`, 404);
  }
}
export { NotFoundError };

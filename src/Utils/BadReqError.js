import { ApiError } from "./ApiError.js";

class BadReqError extends ApiError {
  constructor(errorlist) {
    let massage = "";
    errorlist.forEach((element) => {
      massage += `${element}\n`;
    });

    super(
      `The request has the following invalid parameters \n ${errorlist}`,
      400
    );
  }
}

export { BadReqError };

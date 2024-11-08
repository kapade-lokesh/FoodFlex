class ApiResponse {
  constructor(sucess, statusCode, data, message) {
    this.success = sucess;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export { ApiResponse };

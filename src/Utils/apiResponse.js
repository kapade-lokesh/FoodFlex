class ApiResponse {
  constructor(sucess, statusCode, data, message) {
    this.sucess = sucess;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export { ApiResponse };

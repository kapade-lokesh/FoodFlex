class UnaunthorizedError extends Error {
  constructor() {
    super("user is unauthorized", 401);
  }
}

export { UnaunthorizedError };

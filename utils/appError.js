class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.status = `${code}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };

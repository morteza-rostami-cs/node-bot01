export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  // message: string, statusCode = 500, isOperational = true
  constructor({
    message,
    statusCode = 500,
    isOperational = true,
  }: {
    message: string;
    statusCode: number;
    isOperational?: boolean;
  }) {
    super(message);
    // http status code
    this.statusCode = statusCode;
    // expected errors -> validation VS programming BUGS
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

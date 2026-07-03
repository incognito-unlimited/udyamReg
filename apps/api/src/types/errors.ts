export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public fields?: Record<string, string>;

  constructor(message: string, statusCode: number, code: string, fields?: Record<string, string>) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', fields?: Record<string, string>) {
    super(message, 400, 'VALIDATION_ERROR', fields);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';
import { ErrorResponse } from '../types/ApiResponse';
import { env } from '../config/env';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.fields ? { fields: err.fields } : {}),
      },
    };
    return res.status(err.statusCode).json(response);
  }

  // Handle generic errors (e.g. from JSON body limit)
  if (err.name === 'PayloadTooLargeError') {
    return res.status(413).json({
      success: false,
      error: {
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request body is too large',
      },
    });
  }

  // Redact sensitive values or full stack traces in production
  if (env.NODE_ENV !== 'test') {
    console.error('Unhandled Exception:', err);
  }

  const response: ErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    },
  };

  return res.status(500).json(response);
};

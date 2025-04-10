import { AuthError } from '../errors/auth-error';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error: ', err);
  if (err instanceof AuthError) {
    res.status(401).json({
      message: err.message,
      error: err.message || 'Authentication failed',
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message || 'Something went wrong',
    });
  }
};

export default errorMiddleware;

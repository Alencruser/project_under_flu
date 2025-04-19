import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../services/jwtService';

export const isConnectedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization');
    if (!token?.length) throw new Error('Authorization missing');
    const decoded = jwtService.verify(token);
    const [username, id] = decoded.split('_');
    req.user = { username, id };
    next();
  } catch (error: unknown) {
    res.status(401).json({
      message: 'Authentication problem',
    });
  }
};

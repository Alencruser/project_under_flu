import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

async function validateDto(data: any, dtoClass: any) {
  const dtoInstance = plainToInstance(dtoClass, data);
  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    const validationErrorMessages = errors.map((error) => {
      const constraints = error.constraints ?? {};
      return `${error.property} - ${Object.values(constraints).join(', ')}`;
    });

    const error = new Error('Validation failed');
    (error as any).validationErrors = validationErrorMessages;
    throw error;
  }
}

export const validateDtoMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateDto(req.body, dtoClass);
      next();
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).validationErrors) {
        return res.status(400).json({
          message: error.message || 'Validation failed',
          validationErrors: (error as any).validationErrors,
        });
      }
    }
  };
};

import boom from '@hapi/boom';
import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';

export const validationHandler = (
  schema: Schema,
  property: 'params' | 'body'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.message));
    }
    next();
  };
};

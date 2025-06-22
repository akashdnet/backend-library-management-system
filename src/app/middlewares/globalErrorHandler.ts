import { Request, Response, NextFunction } from 'express';
import GenericError from './GenericError';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {



      let customError: GenericError;

      if (err.name === 'ValidationError') {
        const message = 'Validation Failed';
        customError = new GenericError(message, 400, err);


      }else if (err.name === 'CastError') {
        const message = `Invalid ID format. The provided value '${err.value}' is not a valid ID.`;
        customError = new GenericError(message, 400, {
            name: err.name,
            value: err.value,
            path: err.path
        });


      }else if (err.code === 11000) {
        const duplicateKey = Object.keys(err.keyValue)[0];
        const message = `The value for '${duplicateKey}' is already taken.`;
        customError = new GenericError(message, 409, err.keyValue);


      }else if (err) {
        customError = err;


      }else {
        customError = new GenericError(err.message || 'Something went wrong!', err.statusCode || 500);
      }


  res.status(customError.statusCode).json({
    message: customError.message,
    success: false,
    error: customError.errorDetails || { message: customError.message },
  });

  
};
export default class GenericError extends Error {

  public statusCode: number;
  public errorDetails?: any; 

  constructor(message: string, statusCode: number, errorDetails: any = null) {
    super(message);
    
    this.statusCode = statusCode;
    if (errorDetails) {
        this.errorDetails = errorDetails;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
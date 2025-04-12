import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { NodeEnv } from '../constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = exception;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const res = exception.getResponse();

        if (typeof res === 'string') {
          message = res;
        } else if (this.isErrorResponse(res)) {
          message = res.message;
        }
      }
      error = res;
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Database query error';
      const dbError = exception.driverError;

      const isProd = process.env.NODE_ENV === NodeEnv.Production;
      message = isProd ? 'An unexpected database error occurred.' : 'Database query error';

      error = isProd
        ? undefined
        : {
            message: dbError?.message || 'Unknown DB error',
            detail: dbError?.detail,
            code: dbError?.code,
          };
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }
  private isErrorResponse = (obj: unknown): obj is { message: string } => {
    return typeof obj === 'object' && obj !== null && 'message' in obj;
  };
}

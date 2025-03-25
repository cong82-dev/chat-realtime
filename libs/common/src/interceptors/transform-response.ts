import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { getMessage } from '../messages';
import { map } from 'rxjs';

export interface Response {
  message?: string;
  data?: unknown;
  meta?: unknown;
  error?: unknown;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const status = response.statusCode;

    return next.handle().pipe(
      map((data: Response) => {
        const message = data?.message || getMessage(status);
        return {
          statusCode: status,
          message,
          data: data?.data,
          meta: data?.meta,
        };
      }),
      // catchError((err: Error & HttpException) => {
      //   const statusCode = err instanceof HttpException ? err.getStatus() : 500;
      //   console.log('statusCode', statusCode, err);
      //   const errorResponse = {
      //     statusCode: statusCode,
      //     message: err.message || message,
      //     error: err.name || 'Error',
      //   };
      //   return throwError(() => new HttpException(errorResponse, status));
      // }),
    );
  }
}

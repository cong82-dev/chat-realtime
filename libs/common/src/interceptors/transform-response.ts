import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getMessage } from '@app/common/messages';
import { Response } from 'express';

export interface ResponseData<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T = any> implements NestInterceptor<unknown, ResponseData<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseData<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data: T) => {
        const statusCode = response.statusCode || 200;
        const message = getMessage(statusCode) || 'SUCCESS';
        return {
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}

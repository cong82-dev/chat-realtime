import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const result = (() => {
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        const responseBody = exception.getResponse();
        if (typeof responseBody === 'string') {
          return { status, message: responseBody, errors: null };
        } else if (typeof responseBody === 'object') {
          const { message, errors } = responseBody as { message?: string; errors?: unknown };
          return { status, message: message || 'Unknown error', errors: errors || null };
        }
      }

      if (exception instanceof QueryFailedError) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Database error',
          errors: (exception as any).message,
        };
      }

      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', errors: null };
    })() as { status: number; message: string; errors: unknown | null };
    const { status, message, errors } = result;

    this.logger.error(
      `[${request.method}] [${status}] ${request.url}
→ Body: ${JSON.stringify(request.body)}
→ Message: ${JSON.stringify(message)}
→ Errors: ${JSON.stringify(errors)}`,
      exception instanceof Error ? exception.stack : undefined,
      AllExceptionsFilter.name,
    );

    response.status(status).json({
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}

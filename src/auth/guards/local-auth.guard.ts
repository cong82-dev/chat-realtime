import { ERROR_TYPES_MESSAGE } from '@app/common/constants/message-api';
import { LoginDto } from '@app/common/dto/auth.dto';
import { formatErrorPipeUtil } from '@app/common/utils/validate.util';
import { BadRequestException, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const loginDto = plainToInstance(LoginDto, request.body);
    const errors = await validate(loginDto);

    if (errors.length > 0) {
      const formattedErrors = formatErrorPipeUtil(errors);
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ERROR_TYPES_MESSAGE.VALIDATE_ERROR,
        errors: formattedErrors,
      });
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}

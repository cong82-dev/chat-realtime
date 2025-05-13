import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { BaseSuccessResponse } from '../ base-response.dto';
import { AccessTokenResponseDto } from './auth-respon.swagger';

export function SwaggerRefreshToken() {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh token' }),
    ApiBody({
      type: BaseSuccessResponse<AccessTokenResponseDto>,
      description: 'Refresh token',
    }),
    ApiResponse({
      status: 200,
      description: 'Refresh token successfully',
      type: AccessTokenResponseDto,
    }),
    ApiUnauthorizedResponse({
      description: 'Invalid refresh token',
    }),
  );
}

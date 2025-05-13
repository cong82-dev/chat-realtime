import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IRequest } from '@app/common/interfaces';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '@app/common/dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '@app/common/decorators/public.decorator';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { IUser } from '@app/common/interfaces/user.interface';
import { IToken } from '@app/common/interfaces/token.interface';
import { Response } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@app/common/constants/message-api';
import { SwaggerRefreshToken } from '@app/common/swagger/auth/auth.swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(
    @Req() { user }: IRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IToken & { user: Partial<IUser> }> {
    return this.authService.login(user, res);
  }

  @Public()
  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Req() { user }: IRequest) {
    return this.authService.getProfile(user.id);
  }

  @Public()
  @Post('refresh-token')
  @UseGuards(JwtRefreshTokenGuard)
  @SwaggerRefreshToken()
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() { user }: IRequest): Promise<IToken & { user: Partial<IUser> }> {
    const { accessToken, refreshToken, user: userData } = await this.authService.refreshToken(user);

    return { accessToken, refreshToken, user: userData };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: SUCCESS_MESSAGE.AUTH.LOGOUT_SUCCESS })
  @ApiResponse({ status: 401, description: ERROR_MESSAGE.AUTH.INVALID_ACCESS_TOKEN })
  @ApiBearerAuth()
  async logout(@Req() { user }: IRequest, @Res({ passthrough: true }) res: Response): Promise<string> {
    return this.authService.logout(user, res);
  }
}

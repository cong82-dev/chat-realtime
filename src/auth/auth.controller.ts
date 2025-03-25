import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IRequest } from '@app/common/interfaces';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '@app/common/dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@Req() { user }: IRequest) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IRequest } from '@app/common/interfaces';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '@app/common/dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '@app/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@Req() { user }: IRequest) {
    return this.authService.login(user);
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
}

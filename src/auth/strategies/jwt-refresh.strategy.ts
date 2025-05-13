import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ERROR_MESSAGE } from '@app/common/constants/message-api';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.headers?.cookie?.split('=')[1] || null;
        },
      ]),
      secretOrKey: configService.get<string>('app.jwtRefreshTokenSecret')!,
      passReqToCallback: true,
    });
  }
  async validate(request: Request, { sub: userId }: { sub: string }) {
    const refreshToken = request.headers?.cookie?.split('=')[1];
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.ACCOUNT_NOT_FOUND);
    }

    if (!refreshToken) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.INVALID_REFRESH_TOKEN);
    }

    const isValidRefreshToken = await this.authService.validateRefreshToken(user, refreshToken);

    if (!isValidRefreshToken) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.INVALID_REFRESH_TOKEN);
    }

    return user;
  }
}

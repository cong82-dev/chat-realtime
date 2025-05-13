import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { COOKIE_EXPIRATION_TIME, TOKEN_TYPE } from '@app/common/constants/auth';

@Injectable()
export class CookieService {
  constructor(private configService: ConfigService) {}

  setCookieRefreshToken(refreshToken: string, res: Response): void {
    res.cookie(TOKEN_TYPE.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: this.configService.get<boolean>('app.isProduction'),
      sameSite: 'strict',
      maxAge: COOKIE_EXPIRATION_TIME,
    });
  }

  deleteCookieRefreshToken(res: Response): void {
    res.clearCookie(TOKEN_TYPE.REFRESH_TOKEN, {
      httpOnly: true,
      secure: this.configService.get<boolean>('app.isProduction'),
      sameSite: 'strict',
    });
  }
}

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@app/common/constants/message-api';
import { LoginDto } from '@app/common/dto/auth.dto';
import { IToken } from '@app/common/interfaces/token.interface';
import { IUser } from '@app/common/interfaces/user.interface';
import { BcryptService } from '@app/common/utils/bcrypt.service';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { CookieService } from './cookie.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cookieService: CookieService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new ConflictException('Email not found');
    }

    await this.verifyPlainContentWithHashedContent(password, user.password);

    return user;
  }

  async validateRefreshToken(user: IUser, refreshToken: string): Promise<boolean> {
    if (!user.hashedRt) {
      return false;
    }

    const isMatching = await this.bcryptService.compareHash(refreshToken, user.hashedRt);

    return isMatching;
  }

  async generateTokens(user: IUser): Promise<IToken> {
    const payload = { sub: user.id, email: user.email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('app.jwtAccessTokenSecret'),
        expiresIn: `${this.configService.get<string>('app.jwtAccessTokenExpiresIn')}`,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('app.jwtRefreshTokenSecret'),
        expiresIn: `${this.configService.get<string>('app.jwtRefreshTokenExpiresIn')}`,
      }),
    ]).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });

    return { accessToken, refreshToken };
  }

  private async verifyPlainContentWithHashedContent(plain_text: string, hashed_text: string): Promise<void> {
    const is_matching = await this.bcryptService.compareHash(plain_text, hashed_text);
    if (!is_matching) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.INVALID_PASSWORD);
    }
  }

  private async updateRefreshToken(userId: string, hashedRt: string): Promise<void> {
    const hashRefreshToken = await this.bcryptService.hashValue(hashedRt);
    await this.usersService.updateUserRefreshToken(userId, hashRefreshToken);
  }

  async login(user: IUser, res: Response): Promise<IToken & { user: Partial<IUser> }> {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);
    this.cookieService.setCookieRefreshToken(refreshToken, res);

    return { refreshToken, accessToken, user: { id: user.id } };
  }

  async register(payload: LoginDto): Promise<IToken & { user: Partial<IUser> }> {
    const { email, password } = payload;

    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await this.bcryptService.hashValue(password);

    const newUser = await this.usersService.createUser({ email, password: hashedPassword });

    const { accessToken, refreshToken } = await this.generateTokens(newUser);
    await this.updateRefreshToken(newUser.id, refreshToken);

    return {
      user: { id: newUser.id },
      accessToken,
      refreshToken,
    };
  }

  async getProfile(userId: string): Promise<Partial<IUser>> {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.ACCOUNT_NOT_FOUND);
    }
    return {
      id: user.id,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };
  }

  async logout(user: IUser, res: Response): Promise<string> {
    await Promise.all([
      this.usersService.updateUserRefreshToken(user.id, null),
      this.cookieService.deleteCookieRefreshToken(res),
    ]).catch(() => {
      throw new BadRequestException(SUCCESS_MESSAGE.AUTH.LOGOUT_SUCCESS);
    });
    return SUCCESS_MESSAGE.AUTH.LOGOUT_SUCCESS;
  }

  async refreshToken(user: IUser): Promise<IToken & { user: Partial<IUser> }> {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user: { id: user.id } };
  }
}

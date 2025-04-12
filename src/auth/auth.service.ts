import { ERROR_MESSAGE } from '@app/common/constants/error.message';
import { LoginDto } from '@app/common/dto/auth.dto';
import { IToken } from '@app/common/interfaces/token.interface';
import { IUser } from '@app/common/interfaces/user.interface';
import { BcryptService } from '@app/common/utils/bcrypt.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.EMAIL_NOT_FOUND);
    }

    await this.verifyPlainContentWithHashedContent(password, user.password);

    return user;
  }

  async generateAccessToken(user: IUser): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('app.jwtAccessTokenSecret'),
      expiresIn: `${this.configService.get('app.jwtAccessTokenExpiresIn')}m`,
    });
  }

  async generateRefreshToken(user: IUser): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('app.jwtRefreshTokenSecret'),
      expiresIn: `${this.configService.get('app.jwtRefreshTokenExpiresIn')}d`,
    });
  }

  private async verifyPlainContentWithHashedContent(plain_text: string, hashed_text: string): Promise<void> {
    const is_matching = await this.bcryptService.compareHash(plain_text, hashed_text);
    if (!is_matching) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.INVALID_PASSWORD);
    }
  }

  async login(user: IUser): Promise<IToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });

    return { refreshToken, accessToken };
  }

  async register(payload: LoginDto): Promise<Partial<IUser> & IToken> {
    const { email, password } = payload;

    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await this.bcryptService.hashValue(password);

    const newUser = await this.usersService.createUser({ email, password: hashedPassword });
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(newUser),
      this.generateRefreshToken(newUser),
    ]);

    return {
      id: newUser.id,
      email: newUser.email,
      accessToken,
      refreshToken,
    };
  }

  async getProfile(userId: string): Promise<Partial<IUser>> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.USER_NOT_FOUND);
    }
    return {
      id: user.id,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };
  }
}

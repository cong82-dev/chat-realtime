import { ERROR_MESSAGE } from '@app/common/constants/error.message';
import { SUCCESS_MESSAGE } from '@app/common/constants/success.message';
import { LoginDto } from '@app/common/dto/auth.dto';
import { ResponseDto } from '@app/common/dto/response.dto';
import { BcryptService } from '@app/common/utils/bcrypt.service';
import { UserEntity } from '@app/database/entities/users.entity';
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

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH.EMAIL_NOT_FOUND);
    }

    await this.verifyPlainContentWithHashedContent(password, user.password);

    return user;
  }

  async generateAccessToken(user: UserEntity): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('app.jwtAccessTokenSecret'),
      expiresIn: `${this.configService.get('app.jwtAccessTokenExpiresIn')}m`,
    });
  }

  async generateRefreshToken(user: UserEntity): Promise<string> {
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

  async login(user: UserEntity) {
    const { accessToken, refreshToken } = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });

    return {
      data: {
        accessToken,
        refreshToken,
      },
      message: 'User logged in successfully',
    };
  }

  async register(payload: LoginDto): Promise<ResponseDto> {
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
      data: {
        id: newUser.id,
        email: newUser.email,
        accessToken,
        refreshToken,
      },
      message: SUCCESS_MESSAGE.AUTH.REGISTER_SUCCESS.message,
    };
  }
  // async generateTokens(user: UserEntity) {
  //   const payload = { sub: user.id, username: user.username };
  //   // return {
  //   //   access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
  //   //   refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
  //   // };
  // }
}

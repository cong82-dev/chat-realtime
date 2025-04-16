import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UntilModule } from '@app/common/utils/until.module';
import { UsersModule } from 'src/users/users.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

const modules = [
  ConfigModule,
  UsersModule,
  JwtModule.registerAsync({
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('app.jwtSecret'),
    }),
  }),
  UntilModule,
];
const providers = [AuthService, LocalStrategy, JwtRefreshStrategy];
@Module({
  imports: [...modules],
  providers: [...providers],
  controllers: [AuthController],
})
export class AuthModule {}

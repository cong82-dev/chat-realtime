import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { AuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { FriendshipsModule } from './friendships/friendships.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { AllExceptionsFilter } from '@app/common/filters/bad-request.filter';
import { LoggerService } from '@app/common/logger/logger.service';

const modules = [AppConfigModule, DatabaseModule, AuthModule, UsersModule, LoggerModule];
const providers = [
  JwtService,
  ConfigService,
  LoggerService,
  { provide: APP_GUARD, useClass: AuthGuard },
  { provide: APP_FILTER, useClass: AllExceptionsFilter },
];
@Module({
  imports: [...modules, FriendshipsModule],
  providers: [...providers],
})
export class AppModule {}

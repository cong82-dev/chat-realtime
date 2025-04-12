import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { AuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { FriendshipsModule } from './friendships/friendships.module';

const modules = [AppConfigModule, DatabaseModule, AuthModule, UsersModule];
const providers = [JwtService, ConfigService, { provide: APP_GUARD, useClass: AuthGuard }];
@Module({
  imports: [...modules, FriendshipsModule],
  providers: [...providers],
})
export class AppModule {}

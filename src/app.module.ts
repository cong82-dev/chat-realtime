import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';

const modules = [AppConfigModule, DatabaseModule, AuthModule, UsersModule];
@Module({
  imports: [...modules],
})
export class AppModule {}

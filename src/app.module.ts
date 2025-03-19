import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';

const modules = [AppConfigModule, DatabaseModule, AuthModule, UsersModule];
const controllers = [AppController];
const providers = [AppService];
@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...providers],
})
export class AppModule {}

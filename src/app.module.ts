import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from '@app/config';

const modules = [AppConfigModule, AuthModule, UsersModule];
const controllers = [AppController];
const providers = [AppService];
@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...providers],
})
export class AppModule {}

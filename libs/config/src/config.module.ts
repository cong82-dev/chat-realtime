import { Module } from '@nestjs/common';
import appConfig from './app-env.config';
import { ConfigModule } from '@nestjs/config';
import { validateEnvUtil } from '@app/common/utils/validate.util';
import { AppSchemaConfig } from './schema/app.schema';
import { DatabaseSchemaConfig } from './schema/database.schema';
import databaseEnvConfig from './database-env.config';

const { NODE_ENV } = process.env;
const fileConfigs = [appConfig, databaseEnvConfig];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${NODE_ENV || 'development'}`,
      load: [...fileConfigs],
      cache: true,
      validate: (config) => {
        validateEnvUtil(config, AppSchemaConfig);
        validateEnvUtil(config, DatabaseSchemaConfig);
        return config;
      },
    }),
  ],
})
export class AppConfigModule {}

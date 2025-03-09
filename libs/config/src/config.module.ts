import { Module } from '@nestjs/common';
import appConfig from './app-env.config';
import { ConfigModule } from '@nestjs/config';
import { validateEnvUtil } from '@app/common/utils/validate.util';
import { AppSchemaConfig } from './schema/app.schema';
import { DatabaseSchemaConfig } from './schema/database.schema';
import { DatabaseModule } from '@app/database';
import databaseEnvConfig from './database-env.config';

const fileConfigs = [appConfig, databaseEnvConfig];

const validatedConfig = (config: Record<string, any>) => {
  validateEnvUtil(config, AppSchemaConfig);
  validateEnvUtil(config, DatabaseSchemaConfig);
  return config;
};

const envFilePath = ['.env', '.env.development'];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [...fileConfigs],
      cache: true,
      validate: validatedConfig,
    }),
    DatabaseModule,
  ],
})
export class AppConfigModule {}

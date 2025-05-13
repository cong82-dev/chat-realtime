import { NodeEnv } from '@app/common/constants';
import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  port: number;
  isProduction: boolean;
  isDev: boolean;
  jwtSecret: string;
  jwtAccessTokenExpiresIn: string;
  jwtAccessTokenSecret: string;
  jwtRefreshTokenExpiresIn: string;
  jwtRefreshTokenSecret: string;
}

const DEFAULT_PORT = 3001;

export default registerAs('app', (): IAppConfig => {
  const {
    APP_PORT,
    APP_NODE_ENV,
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_SECRET,
  } = process.env;

  return {
    nodeEnv: APP_NODE_ENV!,
    port: APP_PORT ? parseInt(APP_PORT, 10) : DEFAULT_PORT,
    isProduction: APP_NODE_ENV === NodeEnv.Production,
    isDev: APP_NODE_ENV === NodeEnv.Development,
    jwtSecret: JWT_SECRET!,
    jwtAccessTokenExpiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN!,
    jwtAccessTokenSecret: JWT_ACCESS_TOKEN_SECRET!,
    jwtRefreshTokenExpiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN!,
    jwtRefreshTokenSecret: JWT_REFRESH_TOKEN_SECRET!,
  };
});

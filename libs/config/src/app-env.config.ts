import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  port: number;
}

const DEFAULT_PORT = 3001;

export default registerAs('app', (): IAppConfig => {
  const { APP_PORT, APP_NODE_ENV } = process.env;

  return { nodeEnv: APP_NODE_ENV!, port: APP_PORT ? parseInt(APP_PORT, 10) : DEFAULT_PORT };
});

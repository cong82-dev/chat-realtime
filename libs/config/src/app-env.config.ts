import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  port: number;
}

const DEFAULT_PORT = 3000;
const DEFAULT_NODE_ENV = 'development';

const { APP_PORT, NODE_ENV } = process.env;

export default registerAs(
  'app',
  (): IAppConfig => ({
    nodeEnv: NODE_ENV || DEFAULT_NODE_ENV,
    port: APP_PORT ? parseInt(APP_PORT, 10) : DEFAULT_PORT,
  }),
);

import { registerAs } from '@nestjs/config';

interface IDatabaseConfig {
  host: string;
  port: number;
  password: string;
  username: string;
}

const DEFAULT_PORT = 5432;

const { DATABASE_HOST, DATABASE_PORT, DATABASE_PASSWORD, DATABASE_USERNAME } = process.env;

export default registerAs('database', (): IDatabaseConfig => {
  return {
    host: DATABASE_HOST!,
    port: DATABASE_PORT ? parseInt(DATABASE_PORT, 10) : DEFAULT_PORT,
    password: DATABASE_PASSWORD!,
    username: DATABASE_USERNAME!,
  };
});

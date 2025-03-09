import { registerAs } from '@nestjs/config';

interface IDatabaseConfig {
  host: string;
  port: number;
  password: string;
  username: string;
  database: string;
}

const DEFAULT_PORT = 5432;

export default registerAs('database', (): IDatabaseConfig => {
  const { DB_HOST, DB_PORT, DB_PASSWORD, DB_USER, DB_NAME } = process.env;

  return {
    host: DB_HOST!,
    port: DB_PORT ? parseInt(DB_PORT, 10) : DEFAULT_PORT,
    password: DB_PASSWORD!,
    username: DB_USER!,
    database: DB_NAME!,
  };
});

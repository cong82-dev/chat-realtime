import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
const DATABASE_TYPE = 'postgres';
console.log(join(__dirname, 'entities', '**', '*.entity.{ts,js}'));

const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: DATABASE_TYPE,
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.database'),
    synchronize: false,
    migrations: [join(__dirname, 'libs/database/src/migrations/*.{ts,js}')],
    entities: [join(__dirname, 'libs/database/src/entities/**/*.ts')],
  };
};

export default databaseConfig;

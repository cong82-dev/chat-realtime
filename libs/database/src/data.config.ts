import { ConfigService } from '@nestjs/config';

const databaseConfig = (configService: ConfigService) => ({
  type: 'postgres',
  host: configService.get<string>('databaseConfig.host'),
  port: configService.get<number>('databaseConfig.port'),
  username: configService.get<string>('databaseConfig.username'),
  password: configService.get<string>('databaseConfig.password'),
  database: configService.get<string>('databaseConfig.database'),
  synchronize: true,
});

export default databaseConfig;

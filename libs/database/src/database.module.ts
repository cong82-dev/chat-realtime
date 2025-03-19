import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const configOrm = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('db.host'),
    port: configService.get<number>('db.port'),
    username: configService.get<string>('db.username'),
    password: configService.get<string>('db.password'),
    database: configService.get<string>('db.database'),
    synchronize: true,
  }),
  inject: [ConfigService],
});
const modules = [configOrm];
@Module({
  imports: [...modules],
})
export class DatabaseModule {}

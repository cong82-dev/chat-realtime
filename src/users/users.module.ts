import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/database/entities/users.entity';
import { UserRepository } from '@app/common/repositories/users.repository';

const providers = [UsersService, UserRepository];
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [...providers],
  exports: [UsersService],
})
export class UsersModule {}

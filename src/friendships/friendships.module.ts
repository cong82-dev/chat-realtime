import { Module } from '@nestjs/common';
import { FriendshipsController } from './friendships.controller';
import { FriendshipsService } from './friendships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipEntity } from '@app/database/entities/friendships.entity';
import { FriendshipRepository } from '@app/common/repositories/friendship.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FriendshipEntity]), UsersModule],
  controllers: [FriendshipsController],
  providers: [FriendshipsService, FriendshipRepository],
})
export class FriendshipsModule {}

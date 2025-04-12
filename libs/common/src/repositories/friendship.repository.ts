import { FriendshipEntity } from '@app/database/entities/friendships.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPagination } from '../interfaces';
import { getPaginationParams } from '../helper/pagination.helper';
import { IFriendship } from '../interfaces/friendship.interface';

@Injectable()
export class FriendshipRepository extends BaseRepository<FriendshipEntity> {
  constructor(
    @InjectRepository(FriendshipEntity)
    private readonly friendshipRepository: Repository<FriendshipEntity>,
  ) {
    super(friendshipRepository);
  }

  async findFriendshipBetweenUsers(initiatorId: string, recipientId: string): Promise<FriendshipEntity | null> {
    return this.friendshipRepository.findOne({
      where: [
        { initiator: { id: initiatorId }, recipient: { id: recipientId } },
        { initiator: { id: recipientId }, recipient: { id: initiatorId } },
      ],
    });
  }

  async findFriendshipsByUserId(
    userId: string,
    payload: Partial<IFriendship> & IPagination,
  ): Promise<FriendshipEntity[]> {
    const { skip, take } = getPaginationParams(payload.page, payload.take);
    const { orderBy, status } = payload;
    return this.friendshipRepository.find({
      where: [
        { initiator: { id: userId }, status: status ? status : undefined },
        { recipient: { id: userId }, status: status ? status : undefined },
      ],
      select: { id: true, status: true, initiator: { id: true }, createdAt: true },
      order: { createdAt: orderBy },
      skip,
      take,
    });
  }
}

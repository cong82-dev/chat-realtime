import { FriendshipStatus } from '@app/common/constants';
import { FRIENDSHIP_MESSAGES } from '@app/common/constants/friendship';
import { FriendshipResponseDto } from '@app/common/dto/friendship/response.dto';
import { IPagination } from '@app/common/interfaces';
import { IFriendship } from '@app/common/interfaces/friendship.interface';
import { FriendshipRepository } from '@app/common/repositories/friendship.repository';
import { FriendshipEntity } from '@app/database/entities/friendships.entity';
import { UserEntity } from '@app/database/entities/users.entity';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendshipsService {
  constructor(
    private readonly friendshipRepository: FriendshipRepository,
    private readonly userService: UsersService,
  ) {}

  async getFriendships(userId: string, payload: Partial<IFriendship> & IPagination): Promise<FriendshipEntity[]> {
    const friendships = await this.friendshipRepository.findFriendshipsByUserId(userId, payload);
    return friendships;
  }

  async sendFriendRequest(initiatorId: string, recipientId: string) {
    const existingRequest = await this.friendshipRepository.findFriendshipBetweenUsers(initiatorId, recipientId);

    if (existingRequest) {
      throw new ConflictException(FRIENDSHIP_MESSAGES.FRIEND_REQUEST_EXISTS);
    }

    const [initiator, recipient] = await this.findUsersByIds(initiatorId, recipientId);
    if (!recipient || !initiator) {
      throw new BadRequestException(FRIENDSHIP_MESSAGES.USERS_NOT_FOUND);
    }

    await this.createFriendRequest(initiator, recipient);
    return {
      message: FRIENDSHIP_MESSAGES.FRIEND_REQUEST_SENT,
    };
  }

  async respondToFriendRequest(recipient: string, payload: FriendshipResponseDto) {
    const friendship = await this.friendshipRepository.findFriendshipBetweenUsers(recipient, payload.initiatorId);

    if (!friendship) {
      throw new BadRequestException(FRIENDSHIP_MESSAGES.FRIEND_REQUEST_NOT_FOUND);
    }

    if (friendship.status !== FriendshipStatus.PENDING) {
      throw new ConflictException(FRIENDSHIP_MESSAGES.FRIEND_REQUEST_ALREADY_ACCEPTED);
    }

    const updatedFriendshipStatus = this.getUpdatedStatus(payload.action);
    friendship.status = updatedFriendshipStatus;
    await this.friendshipRepository.save(friendship).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });

    return {
      message: FRIENDSHIP_MESSAGES.FRIEND_REQUEST_UPDATED,
    };
  }

  private getUpdatedStatus(action: FriendshipStatus): FriendshipStatus {
    switch (action) {
      case FriendshipStatus.ACCEPTED:
        return FriendshipStatus.ACCEPTED;
      case FriendshipStatus.REJECTED:
        return FriendshipStatus.REJECTED;
      default:
        throw new BadRequestException(FRIENDSHIP_MESSAGES.INVALID_ACTION);
    }
  }

  private async createFriendRequest(initiator: UserEntity, recipient: UserEntity): Promise<FriendshipEntity> {
    const friendship = this.friendshipRepository.create({
      initiator,
      recipient,
      status: FriendshipStatus.PENDING,
    });

    return this.friendshipRepository.save(friendship).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });
  }

  private async findUsersByIds(
    initiatorId: string,
    recipientId: string,
  ): Promise<[UserEntity | null, UserEntity | null]> {
    const [initiator, recipient] = await Promise.all([
      this.userService.findUserById(initiatorId),
      this.userService.findUserById(recipientId),
    ]);
    return [initiator, recipient];
  }
}

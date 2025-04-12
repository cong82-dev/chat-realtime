import { faker } from '@faker-js/faker';
import { FriendshipEntity } from '../entities/friendships.entity';
import { UserEntity } from '../entities/users.entity';
import { FriendshipStatus } from '@app/common/constants';

export function createFakeFriendship(initiatorId: string, recipientId: string): Partial<FriendshipEntity> {
  const initiator: UserEntity = { id: initiatorId } as UserEntity;
  const recipient: UserEntity = { id: recipientId } as UserEntity;

  const friendshipStatus: FriendshipStatus = faker.helpers.arrayElement([
    FriendshipStatus.PENDING,
    FriendshipStatus.ACCEPTED,
    FriendshipStatus.REJECTED,
  ]);

  return {
    initiator,
    recipient,
    status: friendshipStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

import { faker } from '@faker-js/faker';
import { FriendshipEntity } from '../entities/friendships.entity';
import { UserEntity } from '../entities/users.entity'; // Giả sử bạn đã tạo UserEntity

export function createFakeFriendship(userIds: string[]): Partial<FriendshipEntity> {
  const initiatorId: string = faker.helpers.arrayElement(userIds);
  let recipientId = faker.helpers.arrayElement(userIds);

  // Đảm bảo initiatorId và recipientId khác nhau
  while (initiatorId === recipientId) {
    recipientId = faker.helpers.arrayElement(userIds);
  }

  // Tạo đối tượng UserEntity tương ứng với các ID người dùng
  const initiator: UserEntity = { id: initiatorId } as UserEntity;
  const recipient: UserEntity = { id: recipientId } as UserEntity;
  const friendshipStatus = faker.helpers.arrayElement(['pending', 'accepted', 'rejected']);

  return {
    initiator,
    recipient,
    status: friendshipStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

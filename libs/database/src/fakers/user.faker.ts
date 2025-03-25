import { faker } from '@faker-js/faker';
import { UserEntity } from '../entities/users.entity';
import { UserStatus } from '@app/common/constants';

export function createFakeUser(): Partial<UserEntity> {
  return {
    email: `${faker.internet.email().split('@')[0]}-${faker.string.uuid()}@yopmail.com`,
    password: '$2y$10$bVjzXjlwTtnTVGkk28PJo.37w1Z0zWKAgtH8AzIFjRQBR3fk37n.W',
    avatarUrl: faker.image.avatar(),
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

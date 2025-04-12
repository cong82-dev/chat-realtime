import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { FriendshipEntity } from '../entities/friendships.entity';
import { createFakeFriendship } from '../fakers/friendship.faker';

export async function friendshipSeeder(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(UserEntity);
  const friendshipRepository = dataSource.getRepository(FriendshipEntity);

  const devUser = await userRepository.findOne({
    where: { email: 'dev@yopmail.com' },
  });

  if (!devUser) {
    throw new Error('dev@yopmail.com not found!');
  }

  const otherUsers = await userRepository
    .createQueryBuilder('user')
    .where('user.email != :email', { email: devUser.email })
    .limit(100)
    .getMany();

  const friendships = otherUsers.map((user) => createFakeFriendship(devUser.id, user.id));

  await friendshipRepository.save(friendships);
  console.log(`Inserted ${friendships.length} friendships`);
}

import { UserEntity } from '../entities/users.entity';
import dataSource from '../orm-config';
import { friendshipSeeder } from './friendship.seeder';
import { userSeeder } from './user.seeder';

async function seed() {
  await dataSource.initialize();
  console.log('📡 Connected to database');

  //seed users
  // await userSeeder(dataSource);

  //seed friendships
  // await friendshipSeeder(dataSource);
  const userRepository = dataSource.getRepository(UserEntity);
  const users = await userRepository.findOneBy({ id: '0f92a2d8-83a4-4895-88ad-e66a9e2118b4' });
  console.log('User:', users);

  console.log('✅ Seeding completed!');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error seeding database:', err);
  process.exit(1);
});

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

  console.log('✅ Seeding completed!');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error seeding database:', err);
  process.exit(1);
});

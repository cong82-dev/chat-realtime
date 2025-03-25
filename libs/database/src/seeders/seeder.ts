import dataSource from '../orm-config';
import { userSeeder } from './user.seeder';

async function seed() {
  await dataSource.initialize();
  console.log('📡 Connected to database');

  const userIds = await userSeeder(dataSource);

  console.log('✅ Seeding completed!');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error seeding database:', err);
  process.exit(1);
});

import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { createFakeUser } from '../fakers/user.faker';

export async function userSeeder(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(UserEntity);
  const BATCH_SIZE = 10000;
  const totalUsers = 1000000;
  const userIds: string[] = [];

  for (let i = 0; i < totalUsers; i += BATCH_SIZE) {
    const users = Array.from({ length: BATCH_SIZE }, () => createFakeUser());

    const result = await userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(users)
      .orIgnore()
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    userIds.push(...result.identifiers.map((user) => user.id));
  }
}

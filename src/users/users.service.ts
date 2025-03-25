import { UserRepository } from '@app/common/repositories/users.repository';
import { UserEntity } from '@app/database/entities/users.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);

    return this.userRepository.save(user).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async findOneById(id: string) {
    return this.userRepository.findOneById(id);
  }
}

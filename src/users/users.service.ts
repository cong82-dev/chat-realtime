import { IPagination, IPaginationResult } from '@app/common/interfaces';
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

  async findUserById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneById(id);
  }

  async getAllUsers(payload: IPagination): Promise<IPaginationResult<UserEntity>> {
    return this.userRepository.getAllUsers(payload);
  }

  async updateUserRefreshToken(userId: string, hashedRt: string): Promise<void> {
    return this.userRepository.updateUserRefreshToken(userId, hashedRt).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });
  }
}

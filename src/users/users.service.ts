import { ERROR_MESSAGE } from '@app/common/constants/message-api';
import { UserQueryDto } from '@app/common/dto/users/user-query.dto';
import { IPaginationResult } from '@app/common/interfaces';
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
    const user = await this.userRepository.userDetail(id).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }
    return user;
  }

  async getAllUsers(payload: UserQueryDto): Promise<IPaginationResult<UserEntity>> {
    return this.userRepository.filterUsers(payload).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });
  }

  async updateUserRefreshToken(userId: string, hashedRt: string | null): Promise<void> {
    return this.userRepository.updateUserRefreshToken(userId, hashedRt).catch((error: Error) => {
      throw new BadRequestException(error.message.split('\n').pop());
    });
  }

  async;
}

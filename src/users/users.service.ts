import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { UserRepository } from '@app/common/repositories/users.repository';
import { UserEntity } from '@app/database/entities/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(newUser: Readonly<CreateUserDto>): Promise<UserEntity> {
    const { email, password, username, avatarUrl } = newUser;

    return this.userRepository.save({
      email,
      password,
      username,
      avatarUrl,
    });
  }
}

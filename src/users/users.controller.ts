import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }
}

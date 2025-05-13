import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@app/common/decorators/public.decorator';
import { UserQueryDto } from '@app/common/dto/users/user-query.dto';
import { IDParam } from '@app/common/dto/index.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() payload: UserQueryDto) {
    return this.usersService.getAllUsers(payload);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Query() { id }: IDParam) {
    return this.usersService.findUserById(id);
  }
}

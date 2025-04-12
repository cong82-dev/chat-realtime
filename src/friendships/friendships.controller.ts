import { IRequest } from '@app/common/interfaces';
import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FriendshipsService } from './friendships.service';
import { FriendshipRequestDto } from '@app/common/dto/friendship/request.dto';
import { FriendshipResponseDto } from '@app/common/dto/friendship/response.dto';
import { FriendshipQueryDto } from '@app/common/dto/friendship/query.dto';

@Controller('friendships')
@ApiTags('friendships')
@ApiBearerAuth()
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Get()
  async getFriendships(@Req() { user }: IRequest, @Query() payload: FriendshipQueryDto) {
    return this.friendshipsService.getFriendships(user.id, payload);
  }

  @Post('send-request')
  async sendFriendRequest(@Req() { user }: IRequest, @Body() body: FriendshipRequestDto) {
    return this.friendshipsService.sendFriendRequest(user.id, body.recipientId);
  }

  @Patch('respond-request')
  async respondToFriendRequest(@Req() { user }: IRequest, @Body() body: FriendshipResponseDto) {
    return this.friendshipsService.respondToFriendRequest(user.id, body);
  }
}

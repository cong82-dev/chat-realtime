import { FriendshipStatus } from '@app/common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FriendshipResponseDto {
  @ApiProperty({
    description: 'The ID of the user who is responding to the friend request',
    example: '1234567890abcdef12345678',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  initiatorId: string;

  @ApiProperty({
    type: 'string',
    enum: FriendshipStatus,
    enumName: 'FriendshipStatus',
    example: FriendshipStatus.ACCEPTED,
    description: 'The action to take on the friend request',
  })
  @IsEnum(FriendshipStatus)
  action: FriendshipStatus;
}

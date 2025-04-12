import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FriendshipRequestDto {
  @ApiProperty({
    description: 'The ID of the user to whom the friend request is being sent',
    example: '1234567890abcdef12345678',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}

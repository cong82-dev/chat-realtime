import { FriendshipStatus } from '@app/common/constants';
import { PaginationDto } from '../index.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FriendshipQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: FriendshipStatus, example: FriendshipStatus.ACCEPTED })
  @IsOptional()
  @IsEnum(FriendshipStatus)
  status?: FriendshipStatus;
}

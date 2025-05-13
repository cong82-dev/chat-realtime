import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../index.dto';
import { IsOptional, IsString } from 'class-validator';

export class UserQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search by email',
    example: 'dev@gmail.com',
  })
  @IsOptional()
  @IsString()
  email?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IDParam {
  @ApiProperty({ example: 1 })
  @IsString()
  readonly id: string;
}

export class PaginationDto {
  @ApiProperty({ example: 1 })
  @IsString()
  readonly page: string;

  @ApiProperty({ example: 10 })
  @IsString()
  readonly limit: string;

  @ApiProperty({ example: 'asc' })
  @IsString()
  readonly order: string;
}

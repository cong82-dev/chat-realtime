import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DEFAULT_PAGINATION, OrderBy } from '../constants';
import { Transform } from 'class-transformer';

export class IDParam {
  @ApiProperty({ example: 1 })
  @IsString()
  readonly id: string;
}

export class PaginationDto {
  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }) => {
    return value !== undefined ? Number(value) : DEFAULT_PAGINATION.PAGE;
  })
  @IsOptional()
  @IsNumber()
  readonly page: number;

  @ApiPropertyOptional({ example: 10 })
  @Transform(({ value }) => (value !== undefined ? Number(value) : DEFAULT_PAGINATION.TAKE))
  @IsOptional()
  @IsNumber()
  readonly take: number;

  @ApiPropertyOptional({ enum: OrderBy, example: OrderBy.ASC })
  @Transform(({ value }) => {
    return value !== undefined ? (value as string) : DEFAULT_PAGINATION.ORDER_BY;
  })
  @IsEnum(OrderBy)
  @IsOptional()
  readonly orderBy: OrderBy;
}

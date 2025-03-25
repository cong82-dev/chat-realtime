import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'dev' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'dev@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'pass' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'url' })
  @IsString()
  @IsOptional()
  avatarUrl: string;
}

export class QueryUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status: string;
}

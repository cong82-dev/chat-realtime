import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty()
  avatarUrl: string;
}

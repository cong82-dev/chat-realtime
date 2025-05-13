import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({ example: 'id' })
  id: string;

  @ApiProperty({ example: 'dev@gmail.com' })
  email: string;
}

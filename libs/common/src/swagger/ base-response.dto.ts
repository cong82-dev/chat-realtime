import { ApiProperty } from '@nestjs/swagger';

export class BaseSuccessResponse<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'SUCCESS' })
  message: string;

  @ApiProperty()
  data: T;
}

export class BaseErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ nullable: true })
  errors: any;

  @ApiProperty()
  timestamp: string;
}

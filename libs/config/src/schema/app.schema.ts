import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AppSchemaConfig {
  @IsNumber()
  @IsNotEmpty()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  APP_NODE_ENV: string;
}

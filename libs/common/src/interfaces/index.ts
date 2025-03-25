import { UserEntity } from '@app/database/entities/users.entity';
import { Request as ExpressRequest } from 'express';

export interface IRequest extends ExpressRequest {
  user: UserEntity;
}

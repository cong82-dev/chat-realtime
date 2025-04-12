import { UserEntity } from '@app/database/entities/users.entity';
import { Request as ExpressRequest } from 'express';
import { OrderBy } from '../constants';

export interface IRequest extends ExpressRequest {
  user: UserEntity;
}

export interface IPagination {
  page: number;
  take: number;
  orderBy: OrderBy;
}

export interface IPaginationResult<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    take: number;
  };
}

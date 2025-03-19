import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
export interface IBaseRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findOneById(id: EntityId): Promise<T | null>;
  findByIds(ids: EntityId[]): Promise<T[]>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T | null>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  remove(data: T): Promise<T>;
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
}

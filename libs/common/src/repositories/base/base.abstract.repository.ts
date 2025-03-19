import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { IBaseRepository } from './base.repository.interface';

interface HasId {
  id: string;
}

export abstract class BaseRepository<T extends HasId> implements IBaseRepository<T> {
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data);
  }
  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }
  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async findOneById(id: string): Promise<T | null> {
    const where: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
    return await this.entity.findOneBy(where);
  }

  public async findByIds(ids: string[]): Promise<T[]> {
    const where: FindOptionsWhere<T> = { id: In(ids) } as FindOptionsWhere<T>;
    return await this.entity.findBy(where);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T | null> {
    return await this.entity.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data);
  }
}

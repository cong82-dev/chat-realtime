import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.abstract.repository';
import { UserEntity } from '@app/database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  createUser: any;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  public findAll(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return this.userRepository.find(options);
  }

  public findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }
}

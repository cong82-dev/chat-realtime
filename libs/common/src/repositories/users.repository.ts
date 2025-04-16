import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.abstract.repository';
import { UserEntity } from '@app/database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPagination, IPaginationResult } from '../interfaces';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  createUser: any;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async getAllUsers(payload: IPagination): Promise<IPaginationResult<UserEntity>> {
    return this.paginate(payload, { select: { id: true, email: true } });
  }

  async updateUserRefreshToken(id: string, hashedRt: string): Promise<void> {
    await this.userRepository.update({ id }, { hashedRt });
  }
}

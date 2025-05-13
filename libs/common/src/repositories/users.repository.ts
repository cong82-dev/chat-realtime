import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.abstract.repository';
import { UserEntity } from '@app/database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserQueryDto } from '../dto/users/user-query.dto';
import { IPaginationResult } from '../interfaces';
import { getPaginationParams } from '../helper/pagination.helper';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async userDetail(id: string): Promise<UserEntity | null> {
    const userData = this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
    return userData;
  }

  async updateUserRefreshToken(id: string, hashedRt: string | null): Promise<void> {
    await this.userRepository.update({ id }, { hashedRt });
  }

  async filterUsers(payload: UserQueryDto): Promise<IPaginationResult<UserEntity>> {
    const { skip, take, page } = getPaginationParams(payload.page, payload.take);
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (payload.email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${payload.email}%` });
    }

    queryBuilder.skip(skip).take(take);
    queryBuilder.orderBy('user.createdAt', payload.orderBy);
    queryBuilder.select(['user.id', 'user.email']);
    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page: page,
        take,
      },
    };
  }
}

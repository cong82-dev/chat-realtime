import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base/base.abstract.repository';
import { ConversationEntity } from '@app/database/entities/conversations/conversations.entity';
import { Repository } from 'typeorm';
import { ConversationMemberEntity } from '@app/database/entities/conversations/conversation-members.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConversationRepository extends BaseRepository<ConversationEntity> {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepo: Repository<ConversationEntity>,
    @InjectRepository(ConversationMemberEntity)
    private readonly memberRepo: Repository<ConversationMemberEntity>,
  ) {
    super(conversationRepo);
  }

  async getUserConversation(userId: string) {
    return (
      this.conversationRepo
        .createQueryBuilder('c')
        // Join với ConversationMember để lấy thông tin thành viên
        .leftJoinAndSelect('c.conversationMembers', 'cm')
        // Join với User để lấy thông tin của người dùng trong ConversationMember
        .leftJoinAndSelect('cm.member', 'm')
        // Lọc cuộc trò chuyện nơi người dùng là thành viên
        .where('m.user_id = :userId', { userId })
        // Sắp xếp theo thời gian cập nhật của cuộc trò chuyện
        .orderBy('c.updated_at', 'DESC')
        .getMany()
    );
  }
}

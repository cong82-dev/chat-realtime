import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from '@app/database/entities/conversations/conversations.entity';
import { ConversationMemberEntity } from '@app/database/entities/conversations/conversation-members.entity';
import { ConversationRepository } from '@app/common/repositories/conversation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationEntity, ConversationMemberEntity])],
  providers: [ConversationsService, ConversationRepository],
  controllers: [ConversationsController],
})
export class ConversationsModule {}

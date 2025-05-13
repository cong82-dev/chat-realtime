import { ConversationRepository } from '@app/common/repositories/conversation.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationsService {
  constructor(private readonly conversationRepo: ConversationRepository) {}

  async getConversations(userId: string) {
    return this.conversationRepo.getUserConversation(userId);
  }
}

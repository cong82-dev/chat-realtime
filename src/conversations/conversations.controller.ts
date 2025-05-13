import { IRequest } from '@app/common/interfaces';
import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
@ApiTags('conversations')
@ApiBearerAuth()
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getConversation(@Req() { user: { id } }: IRequest) {
    return this.conversationService.getConversations(id);
  }
}

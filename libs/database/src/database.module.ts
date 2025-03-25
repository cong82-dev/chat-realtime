import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { FriendshipEntity } from './entities/friendships.entity';
import { ConversationEntity } from './entities/conversations/conversations.entity';
import { ConversationMemberEntity } from './entities/conversations/conversation-members.entity';
import { MessageEntity } from './entities/messages/messages.entity';
import { MessageAttachmentEntity } from './entities/messages/message-attachments.entity';

const configOrm = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('db.host'),
    port: configService.get<number>('db.port'),
    username: configService.get<string>('db.username'),
    password: configService.get<string>('db.password'),
    database: configService.get<string>('db.database'),
    entities: [
      UserEntity,
      FriendshipEntity,
      ConversationEntity,
      ConversationMemberEntity,
      MessageEntity,
      MessageAttachmentEntity,
    ],
    synchronize: true,
  }),
  inject: [ConfigService],
});
const modules = [configOrm];
@Module({
  imports: [...modules],
})
export class DatabaseModule {}

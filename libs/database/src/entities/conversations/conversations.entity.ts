import { FriendshipType } from '@app/common/constants';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../users.entity';
import { BaseEntity } from '../base.entity';
import { ConversationMemberEntity } from './conversation-members.entity';
import { MessageEntity } from '../messages/messages.entity';

@Entity('conversations')
export class ConversationEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: FriendshipType, default: FriendshipType.PRIVATE })
  type: FriendshipType;

  @ManyToOne(() => UserEntity, (user) => user.conversations)
  @JoinColumn({ name: 'created_by_id' })
  CreatedBy: UserEntity;

  @ManyToOne(() => ConversationMemberEntity, (conversationMember) => conversationMember.conversation)
  conversationMembers: ConversationMemberEntity[];

  @ManyToOne(() => MessageEntity, (message) => message.conversation)
  messages: MessageEntity[];
}

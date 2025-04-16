import { Column, Entity, OneToMany } from 'typeorm';
import { FriendshipEntity } from './friendships.entity';
import { BaseEntity } from './base.entity';
import { ConversationEntity } from './conversations/conversations.entity';
import { ConversationMemberEntity } from './conversations/conversation-members.entity';
import { MessageEntity } from './messages/messages.entity';
import { UserStatus } from '@app/common/constants';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true, name: 'avatar_url' })
  avatarUrl: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'hashed_rt' })
  hashedRt: string;

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.initiator)
  friendRequestsCreators: FriendshipEntity[];

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.recipient)
  friendRequestsRecipients: FriendshipEntity[];

  @OneToMany(() => ConversationEntity, (conversation) => conversation.CreatedBy)
  conversations: ConversationEntity[];

  @OneToMany(() => ConversationMemberEntity, (conversationMember) => conversationMember.member)
  conversationMembers: ConversationMemberEntity[];

  @OneToMany(() => MessageEntity, (message) => message.sender)
  messages: MessageEntity[];
}

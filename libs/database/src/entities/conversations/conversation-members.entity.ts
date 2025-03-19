import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ConversationEntity } from './conversations.entity';
import { UserEntity } from '../users.entity';
import { GroupRole } from '@app/common/constants';
import { BaseEntity } from '../base.entity';

@Entity('conversation_members')
export class ConversationMemberEntity extends BaseEntity {
  @ManyToOne(() => ConversationEntity, (conversation) => conversation.conversationMembers)
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @Column({ type: 'enum', enum: GroupRole, default: GroupRole.MEMBER })
  role: GroupRole;

  @ManyToOne(() => UserEntity, (user) => user.conversationMembers)
  @JoinColumn({ name: 'member_id' })
  member: UserEntity;
}

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './conversations.entity';
import { User } from '../users.entity';
import { GroupRole } from '@app/common/constants';

@Entity('conversation_members')
export class ConversationMember {
  @PrimaryGeneratedColumn('uuid', { name: 'member_id' })
  memberId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.conversationId)
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.userId)
  member: User;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @Column({ type: 'enum', enum: GroupRole, default: GroupRole.MEMBER })
  role: GroupRole;
}

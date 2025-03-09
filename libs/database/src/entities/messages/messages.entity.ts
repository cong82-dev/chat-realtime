import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Conversation } from '../conversations/conversations.entity';
import { User } from '../users.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid', { name: 'message_id' })
  messageId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.conversationId)
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.userId)
  sender: User;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 20, name: 'message_type' })
  messageType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt?: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}

import { Entity, ManyToOne, Column, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../users.entity';
import { ConversationEntity } from '../conversations/conversations.entity';
import { MessageAttachmentEntity } from './message-attachments.entity';
import { BaseEntity } from '../base.entity';

@Entity('messages')
export class MessageEntity extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 20, name: 'message_type' })
  messageType: string;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn({ name: 'sender_id' })
  sender: UserEntity;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;

  @OneToMany(() => MessageAttachmentEntity, (messageAttachment) => messageAttachment.message)
  messageAttachments: MessageAttachmentEntity[];
}

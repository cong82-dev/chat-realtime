import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity } from 'typeorm';
import { FileType } from '@app/common/constants';
import { Message } from './messages/messages.entity';

@Entity('message_attachments')
export class MessageAttachment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'attachment_id' })
  attachmentId: string;

  @ManyToOne(() => Message, (message) => message.messageId)
  message: Message;

  @Column({ type: 'text', name: 'file_url' })
  fileUrl: string;

  @Column({ type: 'enum', enum: FileType, name: 'file_type' })
  fileType: FileType;
}

import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { FileType } from '@app/common/constants';
import { BaseEntity } from '../base.entity';
import { MessageEntity } from './messages.entity';

@Entity('message_attachments')
export class MessageAttachmentEntity extends BaseEntity {
  @Column({ type: 'text', name: 'file_url' })
  fileUrl: string;

  @Column({ type: 'enum', enum: FileType, name: 'file_type' })
  fileType: FileType;

  @ManyToOne(() => MessageEntity, (message) => message.messageAttachments)
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity;
}

import { FriendshipType } from '@app/common/constants';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users.entity';

@Entity('conversations')
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'conversation_id' })
  conversationId: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: FriendshipType, default: FriendshipType.PRIVATE })
  type: FriendshipType;

  @ManyToOne(() => User, (user) => user.userId)
  @Column({ name: 'created_by' })
  CreatedBy: User;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';
import { BaseEntity } from './base.entity';

@Entity('friendships')
export class FriendshipEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.friendRequestsCreators)
  @JoinColumn({ name: 'initiator_id' })
  initiator: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.friendRequestsRecipients)
  @JoinColumn({ name: 'recipient_id' })
  recipient: UserEntity;
}

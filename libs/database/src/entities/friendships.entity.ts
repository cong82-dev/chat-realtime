import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';
import { BaseEntity } from './base.entity';
import { FriendshipStatus } from '@app/common/constants';

@Entity('friendships')
@Index('friendship_index', ['initiator', 'recipient'], { unique: true })
export class FriendshipEntity extends BaseEntity {
  @Column({ type: 'enum', enum: FriendshipStatus, default: FriendshipStatus.PENDING })
  status: FriendshipStatus;

  @ManyToOne(() => UserEntity, (user) => user.friendRequestsCreators)
  @JoinColumn({ name: 'initiator_id' })
  initiator: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.friendRequestsRecipients)
  @JoinColumn({ name: 'recipient_id' })
  recipient: UserEntity;
}

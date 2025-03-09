import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('friendships')
export class Friendship extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'friendship_id' })
  friendshipId: string;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.userId)
  initiator: User;

  @ManyToOne(() => User, (user) => user.userId)
  recipient: User;
}

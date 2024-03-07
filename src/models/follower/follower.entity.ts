import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'follower' })
export class Follower {
  @PrimaryColumn()
  follower_id: string;

  @Column({ type: 'uuid', nullable: false })
  following_user_id: string;

  @Column({ type: 'uuid', nullable: false })
  followed_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'following_user_id', referencedColumnName: 'user_id' })
  following_user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'followed_user_id', referencedColumnName: 'user_id' })
  followed_user: User;
}

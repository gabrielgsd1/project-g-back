import { ModelWithTimeFields } from 'config/database/ModelWithTimeFields.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
// import { User } from '../user/user.entity';

@Entity({ name: 'post' })
export class Post extends ModelWithTimeFields {
  @PrimaryColumn({ type: 'uuid' })
  post_id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'boolean' })
  is_age_restricted: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @Column({ type: 'uuid', nullable: true })
  parent_post_id: string;

  @ManyToOne(() => Post, (post) => post.child_posts)
  @JoinColumn({ name: 'parent_post_id', referencedColumnName: 'post_id' })
  parent_post: Post;

  @OneToMany(() => Post, (post) => post.parent_post, {})
  // @JoinTable()
  child_posts: Post[];
}

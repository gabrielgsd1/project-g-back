import { ModelWithCreateAndDelete } from 'config/database/ModelWithTimeFields.model';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'post_file' })
export class PostFile extends ModelWithCreateAndDelete {
  @PrimaryColumn({ type: 'uuid' })
  post_file_id: string;

  @Column({ type: 'uuid' })
  @ManyToOne(() => Post, (post) => post.post_id)
  post_id: string;

  @Column({ type: 'uuid' })
  @ManyToOne(() => User, (user) => user.user_id)
  user_id: string;

  @Column({ type: 'varchar' })
  file_path: string;
}

import { ModelWithCreateAndDelete } from 'config/database/ModelWithTimeFields.model';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'post_like' })
export class PostLike extends ModelWithCreateAndDelete {
  @PrimaryColumn({ type: 'uuid' })
  post_like_id: string;

  @Column({ type: 'uuid' })
  post_id: string;

  @Column({ type: 'uuid' })
  user_id: string;
}

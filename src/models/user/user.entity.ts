import { ModelWithTimeFields } from 'config/database/ModelWithTimeFields.model';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity({ name: 'user' })
export class User extends ModelWithTimeFields {
  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  salt: string;

  @Column({ type: 'boolean' })
  is_verified: boolean;

  @Column({ type: 'date' })
  birthdate: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

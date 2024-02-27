import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ModelWithTimeFields {
  @Column({ type: 'date' })
  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn({ nullable: true })
  updated_at: string;

  @DeleteDateColumn({ nullable: true })
  deleted_at: string;
}

export class ModelWithCreateAndDelete {
  @CreateDateColumn()
  created_at: string;

  @DeleteDateColumn({ nullable: true })
  deleted_at: string;
}

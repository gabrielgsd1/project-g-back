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

  @UpdateDateColumn()
  @Column({ type: 'date', nullable: true })
  updated_at: string;

  @DeleteDateColumn()
  @Column({ type: 'date', nullable: true })
  deleted_at: string;
}

export class ModelWithCreateAndDelete {
  @Column({ type: 'date' })
  @CreateDateColumn()
  created_at: string;

  @DeleteDateColumn()
  @Column({ type: 'date' })
  deleted_at: string;
}

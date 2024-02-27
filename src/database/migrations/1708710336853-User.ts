import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1708710336853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'birthdate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'username',
            isNullable: true,
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'email',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            isNullable: true,
            type: 'timestamp',
          },
          {
            name: 'deleted_at',
            isNullable: true,
            type: 'timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}

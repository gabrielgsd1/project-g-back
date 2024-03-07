import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Follower1709066052479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'follower',
        columns: [
          {
            name: 'follower_id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'following_user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'followed_user_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'follower',
      new TableForeignKey({
        columnNames: ['following_user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['user_id'],
      }),
    );
    await queryRunner.createForeignKey(
      'follower',
      new TableForeignKey({
        columnNames: ['followed_user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('follower');
  }
}

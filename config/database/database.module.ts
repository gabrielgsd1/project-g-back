import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

configDotenv();

const configObj = {
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  migrationsTableName: 'type_orm_migrations',
  entities: [join('dist', '**', '*.entity.{ts,js}')],
  migrations: [join('dist/src/database/migrations/*.{ts,js}')],
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  type: 'postgres' as const,
};

@Module({
  imports: [TypeOrmModule.forRoot({ ...configObj, host: 'localhost' })],
})
export class DatabaseModule {}

export const datasource = new DataSource(configObj);

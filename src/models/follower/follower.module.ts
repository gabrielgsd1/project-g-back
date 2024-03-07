import { Module } from '@nestjs/common';
import { FollowerController } from './follower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower.entity';
import { FollowerService } from './follower.service';

@Module({
  controllers: [FollowerController],
  imports: [TypeOrmModule.forFeature([Follower])],
  providers: [FollowerService],
})
export class FollowerModule {}

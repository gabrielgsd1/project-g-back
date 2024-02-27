import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostLike } from '../post_likes/post_likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostLike])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}

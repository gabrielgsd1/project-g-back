import { IsNull, Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { PostNotFoundException } from 'src/exceptions/PostNotFoundException.exception';
import { PostLike } from '../post_likes/post_likes.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(PostLike) private postLikeRepo: Repository<PostLike>,
  ) {}

  get() {
    return this.postRepo.find({
      relations: {
        user: true,
      },
    });
  }

  getUserPosts(user: User) {
    return this.postRepo.find({
      where: { user_id: user.user_id, parent_post_id: IsNull() },
      relations: {
        user: true,
      },
    });
  }

  async togglePostLike(postId: string, user: User) {
    const exists = await this.postRepo.exists({ where: { post_id: postId } });
    if (!exists) throw new PostNotFoundException();
    const hasLikedBefore = await this.postLikeRepo.findOne({
      where: { post_id: postId, user_id: user.user_id },
    });
    if (!hasLikedBefore) {
      const entity = this.postLikeRepo.create({
        post_id: postId,
        user_id: user.user_id,
      });
      await this.postLikeRepo.save(entity);
      return this.postRepo.increment({ post_id: postId }, 'likes', 1);
    }
    await this.postLikeRepo.softDelete({
      post_like_id: hasLikedBefore.post_like_id,
    });
    return this.postRepo.decrement({ post_id: postId }, 'likes', 1);
  }
}

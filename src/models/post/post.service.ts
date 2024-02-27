import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  get() {
    return this.postRepo.find({
      relations: {
        user: true,
        parent_post: true,
        child_posts: true,
      },
    });
  }
}

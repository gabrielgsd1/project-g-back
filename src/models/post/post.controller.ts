import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthUser } from 'src/common/auth/authUser.decorator';

@AuthUser()
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async get() {
    return await this.postService.get();
  }
}

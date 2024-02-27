import { Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthUser } from 'src/common/auth/authUser.decorator';
import { GetUser } from 'src/common/user/user.decorator';
import { User } from '../user/user.entity';

@AuthUser()
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/feed')
  async get() {
    return await this.postService.get();
  }

  @Get('/user')
  async getUserPosts(@GetUser() user: User) {
    return await this.postService.getUserPosts(user);
  }

  @Post('/like/:id')
  async likePost(@Param('id') id: string, @GetUser() user: User) {
    return await this.postService.togglePostLike(id, user);
  }
}

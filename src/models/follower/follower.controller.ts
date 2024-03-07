import { Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/common/user/user.decorator';
import { User } from '../user/user.entity';
import { AuthUser } from 'src/common/auth/authUser.decorator';
import { FollowerService } from './follower.service';
import { UserFollowingItselfException } from 'src/exceptions/UserFollowingItselfException.exception';

@AuthUser()
@Controller('followers')
export class FollowerController {
  constructor(private followerService: FollowerService) {}

  @Get()
  async getCurrentUserFollowers(@GetUser() user: User) {
    return await this.followerService.getCurrentUserFollowDetails(user);
  }

  @Post('/follow/:id')
  async followUser(@Param('id') id: string, @GetUser() user: User) {
    if (user.user_id === id) throw new UserFollowingItselfException();
    return await this.followerService.followUser(id, user);
  }

  @Get('/user/:id')
  getUserFollowers() {
    this.followerService.followUser;
  }
}

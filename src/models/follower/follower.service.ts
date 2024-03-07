import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './follower.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower) private followerRepo: Repository<Follower>,
  ) {}

  async getCurrentUserFollowDetails(user: User) {
    const [followers, following] = await Promise.all([
      this.followerRepo.find({
        where: { followed_user_id: user.user_id },
        relations: { followed_user: true, following_user: true },
      }),
      this.followerRepo.find({
        where: { following_user_id: user.user_id },
        relations: { followed_user: true, following_user: true },
      }),
    ]);
    return { followers, following };
  }

  async followUser(id: string, user: User) {
    const isFollowing = await this.followerRepo.exists({
      where: { followed_user_id: id, following_user_id: user.user_id },
    });
    if (!isFollowing) {
      const createdUser = this.followerRepo.create({
        followed_user_id: id,
        following_user_id: user.user_id,
      });
      await this.followerRepo.save(createdUser);
      return { isFollowing: true };
    }
    await this.followerRepo.delete({
      following_user_id: user.user_id,
      followed_user_id: id,
    });
    return { isFollowing: false };
  }
}

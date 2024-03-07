import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getAllUsers() {
    return this.userRepo.find();
  }

  userExists(id: string) {
    return this.userRepo.existsBy({ user_id: id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { UserAlreadyExistsException } from 'src/exceptions/UserAlreadyExistsException.exception';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async login(credential: string, password: string) {
    const hashedPw = await this.hashPassword(password);
    const stringPw = hashedPw.toString('hex');
    return this.userRepo.findOne({
      where: [
        { email: credential, password: stringPw },
        { username: credential, password: stringPw },
      ],
    });
  }

  private async hashPassword(password: string) {
    return new Promise<Buffer>((resolve, reject) => {
      crypto.pbkdf2(
        password,
        process.env.SALT,
        1000000,
        64,
        'sha512',
        (err, key) => {
          if (err) reject(err);
          resolve(key);
        },
      );
    });
  }

  async createUser(data: CreateUserDTO) {
    const password = await this.hashPassword(data.password);
    const hasEmailRegistered = await this.userRepo.exists({
      where: { email: data.email },
    });
    if (hasEmailRegistered) {
      throw new UserAlreadyExistsException();
    }
    return this.userRepo.save(
      this.userRepo.create({
        user_id: undefined,
        password: password.toString('hex'),
        name: data.name,
        email: data.email,
        birthdate: data.birthdate,
      }),
    );
  }
}

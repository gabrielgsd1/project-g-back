import { HttpException, HttpStatus } from '@nestjs/common';

export class UserFollowingItselfException extends HttpException {
  constructor() {
    super('Não é possível seguir a si mesmo', HttpStatus.UNAUTHORIZED);
  }
}

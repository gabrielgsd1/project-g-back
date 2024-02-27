import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyLoggedInException extends HttpException {
  constructor() {
    super('Usuário já está logado', HttpStatus.UNAUTHORIZED);
  }
}

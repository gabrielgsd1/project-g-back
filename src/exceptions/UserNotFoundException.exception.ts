import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('Credenciais inválidas', HttpStatus.NOT_FOUND);
  }
}

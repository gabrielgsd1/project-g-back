import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAuthorizedException extends HttpException {
  constructor() {
    super('Usuário não autorizado', HttpStatus.UNAUTHORIZED, {
      description: 'Usuário não está logado',
    });
  }
}

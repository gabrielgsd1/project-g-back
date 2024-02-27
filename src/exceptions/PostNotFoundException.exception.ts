import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends HttpException {
  constructor() {
    super('Post não encontrado', HttpStatus.NOT_FOUND);
  }
}

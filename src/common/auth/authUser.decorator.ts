import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthUserGuard } from './authUser.guard';

export function AuthUser() {
  return applyDecorators(UseGuards(AuthUserGuard));
}

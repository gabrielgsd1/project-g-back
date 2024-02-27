import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NO_AUTH_DECORATOR_FIELD } from '../constants';
import { RequestCustom } from 'src/@types/Request';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log(this.reflector);
    const isNoAuth = this.reflector.get(
      NO_AUTH_DECORATOR_FIELD,
      context.getHandler(),
    );
    if (isNoAuth) return true;

    const request = context.switchToHttp().getRequest<RequestCustom>();

    return !!request.session.user;
  }
}

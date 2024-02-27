import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { RequestCustom } from 'src/@types/Request';
import { User } from 'src/models/user/user.entity';

export const GetUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestCustom>();
    return data ? request.session.user[data] : request.session.user;
  },
);

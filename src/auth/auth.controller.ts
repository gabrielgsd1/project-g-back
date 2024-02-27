import { Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateSchema } from 'src/common/validateSchema/validateSchema.decorator';
import { LoginSchema } from './schemas/login.schema';
import { NotAuthorizedException } from 'src/exceptions/NotAuthorizedException.exception';
import { UserSession } from 'src/@types/Request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ValidateSchema(LoginSchema)
  @Post('login')
  login(@Session() session) {
    session.user = Math.random();
    return this.authService.login();
  }

  @Post('verify')
  verify(@Session() session: UserSession) {
    if (!session.user) throw new NotAuthorizedException();
    return session.user;
  }
}

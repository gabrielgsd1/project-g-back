import { Body, Controller, Post, Req, Res, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateSchema } from 'src/common/validateSchema/validateSchema.decorator';
import { LoginSchema } from './schemas/login.schema';
import { NotAuthorizedException } from 'src/exceptions/NotAuthorizedException.exception';
import { RequestCustom, UserSession } from 'src/@types/Request';
import { CreateUserSchema } from './schemas/createUser.schema';
import { UserNotFoundException } from 'src/exceptions/UserNotFoundException.exception';
import { UserAlreadyLoggedInException } from 'src/exceptions/UserAlreadyLoggedInException.exception';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ValidateSchema(LoginSchema)
  @Post('login')
  async login(
    @Session() session: UserSession,
    @Body('credential') credential: string,
    @Body('password') password: string,
  ) {
    if (session.user) throw new UserAlreadyLoggedInException();
    const result = await this.authService.login(credential, password);
    if (!result) throw new UserNotFoundException();
    session.user = result;
    return result;
  }

  @ValidateSchema(CreateUserSchema)
  @Post('create')
  createUser(@Body() body: CreateUserDTO) {
    return this.authService.createUser(body);
  }

  @Post('verify')
  verify(@Session() session: UserSession) {
    if (!session.user) throw new NotAuthorizedException();
    return session.user;
  }

  @Post('logout')
  logout(@Req() request: RequestCustom, @Res() response: Response) {
    request.session.destroy((err) => console.error(err));
    response.clearCookie(process.env.SESSION_COOKIE_NAME);
    return response.sendStatus(200);
  }
}

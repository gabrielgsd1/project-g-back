import { Request } from 'express';
import { Session } from 'express-session';
import { User } from 'src/models/user/user.entity';

type UserSession = Session & {
  user: User;
};

type RequestCustom = Request & {
  session: UserSession;
};

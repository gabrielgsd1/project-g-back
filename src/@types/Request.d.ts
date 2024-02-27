import { Request } from 'express';
import { Session } from 'express-session';

type UserSession = Session & {
  user: any;
};

type RequestCustom = Request & {
  session: UserSession;
};

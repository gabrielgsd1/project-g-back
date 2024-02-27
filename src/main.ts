import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { randomUUID } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: Number(process.env.SESSION_COOKIE_MAXAGE || 100000),
        httpOnly: true,
      },
      genid: () => randomUUID(),
      saveUninitialized: false,
      name: process.env.SESSION_COOKIE_NAME,
      resave: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();

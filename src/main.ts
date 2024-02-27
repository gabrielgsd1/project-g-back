import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { randomUUID } from 'crypto';
import RedisStore from 'connect-redis';
import * as redis from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const client = redis.createClient({});

  client.connect();

  client.on('error', (err) => {
    console.log('FALHA AO INICIAR REDIS');
    console.log(err);
    process.exit(0);
  });

  const store = new RedisStore({
    client,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store,
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

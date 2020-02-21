import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
// import { SessionStore } from './auth/session-store';
import * as Redis from 'ioredis'
import * as config from 'config'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import { join } from "path";
import * as exphbs from "express-handlebars";



async function main() {
  const app = await NestFactory.create(AppModule);

  // const viewsPath = join(__dirname, '../public/views');
  // app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  // app.set('views', viewsPath);
  // app.set('view engine', '.hbs');
  // const sessionStore = app.get(SessionStore);
  const redisStore = connectRedis(session)
  const redisConfig = config.get('redis')
  const sessionConfig = config.get('session')
  const client = new Redis(redisConfig)
  app.use(session(
    Object.assign({
        store: new redisStore(Object.assign(
          {client}, redisConfig
          )
        )},
      sessionConfig,
    )
  ))
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}

main();

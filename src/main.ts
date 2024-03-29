import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';
import * as helmet from 'helmet';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoStore = require('connect-mongo')(session);
const uri = process.env.DB_URL;
const server = Express();
server.get('/', (req, res) => res.send('OK'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .setTitle('Ebuy RestAPI Documentation')
    .setDescription(
      'About upload file problems and some extensions not have in GraphQL',
    )
    .setVersion('1.0')
    .addTag('Product variant', 'Upload product variant')
    .addTag('Slider', 'Upload slider image')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-extensions', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: 'secretKeySession',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new MongoStore({
        url:
          process.env.DB_URL ||
          'mongodb+srv://manh123:manhuetvnuk63j@cluster0.ntafe.mongodb.net/ebuy?retryWrites=true&w=majority',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
  console.log('\nCOMPILE SUCCESS!');
  console.log(
    '\n' +
      '🚀 GraphQL running at ' +
      '\u001b[' +
      32 +
      'm' +
      `http://0.0.0.0:${process.env.PORT || 8080}/graphql` +
      '\u001b[0m',
  );
  console.log(
    '\n' +
      '🚀 Swagger UI running at ' +
      '\u001b[' +
      32 +
      'm' +
      `http://0.0.0.0:${process.env.PORT || 8080}/api-extensions` +
      '\u001b[0m\n',
  );
}
bootstrap();

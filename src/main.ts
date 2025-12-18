import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 세션 설정 (10분 타임아웃)
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'itpc-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000, // 10분 = 600,000ms
        httpOnly: true,
        secure: false, // HTTPS 사용 시 true로 변경
      },
      name: 'sessionId',
    }),
  );

  // ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
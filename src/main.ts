import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {initializeSwagger} from "./shared";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        validationError: {
          target: false,
          value: false,
        },
      }),
  );
  app.setGlobalPrefix('/api/bug');
  await initializeSwagger(app);
  await app.listen(3111);
}
bootstrap();



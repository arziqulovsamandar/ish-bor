import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const config = new DocumentBuilder()
      .setTitle('Ish-bor')
      .setDescription('Practice')
      .setVersion('1.0.0')
      .addTag('NestJS, Postgress, Sequielize')
      .build();

    const PORT = process.env.PORT || 3002;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server ${PORT} - portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

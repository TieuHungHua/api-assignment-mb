import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình Swagger API Docs
  const config = new DocumentBuilder()
    .setTitle('Nộp bài API')
    .setDescription('API Documentation with CRUD and DTO')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Đường dẫn docs sẽ là /api

  app.enableCors(); // Cho phép truy cập từ bên ngoài
  await app.listen(3000);
}
bootstrap();
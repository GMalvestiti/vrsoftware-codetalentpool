import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  setupOpenApi(app);

  await app.listen(3200);

  Logger.log(
    `Application is running on: ${await app.getUrl()}`,
    'Code Talent Pool - Backend',
  );
}
bootstrap();

function setupOpenApi(app: INestApplication): void {
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Code Talent Pool - Backend')
      .setDescription(
        'Backend para o teste prático do Code Talent Pool da VR Software.',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });

    Logger.log(
      `Swagger UI is running on path http://localhost:3200/docs`,
      'Code Talent Pool - Backend',
    );
  }
}

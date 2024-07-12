import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseExceptionsFilter } from './shared/filters/response-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionsFilter());

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

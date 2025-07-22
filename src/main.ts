import { NestFactory, Reflector } from '@nestjs/core';
import { StaticJwtAuthGuard } from './auth/static-jwt.guard';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register StaticJwtAuthGuard globally
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new StaticJwtAuthGuard(configService));
  
  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
    }),
  );

  // Global class serializer interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Enable shutdown hooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Swagger documentation
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // Patch document to enforce global JWT Bearer auth in Swagger UI
  document.components = {
    ...document.components,
    securitySchemes: {
      'JWT-auth': {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  };
  document.security = [{ 'JWT-auth': [] }];
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
    customSiteTitle: 'Student Management API',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation: ${await app.getUrl()}/api`);
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

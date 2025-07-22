import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Student Management API')
  .setDescription('API documentation for Student Management System')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name should be same as the one in @ApiBearerAuth() in your controller
  )
  .addTag('students', 'Operations about students')
  .addTag('student-classes', 'Operations about student classes')
  .build();

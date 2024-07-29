import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/exception';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { ValidationPipe } from '@nestjs/common';
// import { useContainer } from 'class-validator';
// import { UsersModule } from './api/users/users.module';
// import { User } from './model/user.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global handler for unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Here you can log the error to a monitoring system or take other actions
    // You may also want to exit the process, depending on your use case
    // process.exit(1); // Uncomment to exit the process
  });

  await app.listen(3000);
}
bootstrap();

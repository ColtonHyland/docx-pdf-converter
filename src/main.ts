import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, '0.0.0.0');
    logger.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    logger.error('Failed to start application:', error);
  }
}
bootstrap();

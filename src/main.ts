import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  
  const config = new DocumentBuilder()
    .setTitle('WrVideos')
    .setDescription('Catálogo de filmes')
    .setVersion('1.0')
    .addBearerAuth({ 
      in: 'header',
      type:'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',  
    },'JWT-auth')
    .addTag('Catálogo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

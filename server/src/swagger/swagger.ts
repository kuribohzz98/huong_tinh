import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
    .setTitle('Huong')
    .setDescription('The Huong API description')
    .setVersion('1.0')
    .addTag('Huong')
    .build();

export function initSwagger(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}

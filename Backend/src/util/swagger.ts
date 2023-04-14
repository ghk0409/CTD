import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// swagger 세팅
export const setupSwagger = (app: INestApplication): void => {
    const options = new DocumentBuilder()
        .setTitle('CTD API Docs')
        .setDescription('CTD API')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs/api', app, document);
};

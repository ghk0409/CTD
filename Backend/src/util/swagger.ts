import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// swagger 세팅
export const setupSwagger = (app: INestApplication): void => {
    const options = new DocumentBuilder()
        .setTitle('CTD API Docs')
        .setDescription('CTD API')
        .setVersion('1.0.0')
        // jwt 토큰 설정
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs/api', app, document);
};

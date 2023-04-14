import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 데이터 유효성 검사를 위한 pipeline 설정
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    // swagger 세팅
    setupSwagger(app);

    await app.listen(3001);
}
bootstrap();

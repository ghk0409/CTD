import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
            ignoreEnvFile: process.env.NODE_ENV === 'prod',
            // 환경변수 데이터 유효성 검증
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('dev', 'prod').required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                // PRIVATE_KEY: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            // true일 경우, TypeORMdl DB에 연결할 때, DB를 모듈의 현재 상태로 마이그레이션함(prod에서는 false로 설정!!)
            synchronize: process.env.NODE_ENV !== 'prod',
            logging: process.env.NODE_ENV !== 'prod',
            entities: [],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
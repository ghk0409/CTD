import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiEntity } from './entities/ai.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forFeature([AiEntity, UserEntity, TodoEntity]),
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 15000,
                maxRedirects: 2,
            }),
        }),
    ],
    controllers: [AiController],
    providers: [AiService],
})
export class AiModule {}

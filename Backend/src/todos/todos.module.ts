import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { HttpModule } from '@nestjs/axios';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TodoEntity, UserEntity]),
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5,
            }),
        }),
    ],
    controllers: [TodosController],
    providers: [TodosService],
})
export class TodosModule {}

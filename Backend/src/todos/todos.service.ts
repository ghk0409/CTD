import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreateTodoRequestDto,
    CreateTodoResponseDto,
} from './dtos/create-todo.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { EditTodoRequestDto, EditTodoResponseDto } from './dtos/edit-todo.dto';
import { DeleteTodoResponseDto } from './dtos/delete-todo.dto';
import { ListTodoResponseDto } from './dtos/list-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todos: Repository<TodoEntity>,
        @InjectRepository(UserEntity)
        private readonly users: Repository<UserEntity>,
    ) {}

    // 유저 To-Do 조회
    async getTodos(userId: number): Promise<ListTodoResponseDto> {
        try {
            const todos = await this.todos.find({
                where: { user: { id: userId } },
                order: { createdAt: 'DESC' },
            });

            const todoList = todos.map((todo) => ({
                id: todo.id,
                content: todo.content,
                feel: todo.feel,
                status: todo.status,
            }));

            return {
                ok: true,
                data: todoList,
            };
        } catch (error) {
            return {
                ok: false,
                error: 'To-Do 조회 실패',
            };
        }
    }

    // 유저 To-Do 생성
    async createTodo(
        userId: number,
        { content, feel }: CreateTodoRequestDto,
    ): Promise<CreateTodoResponseDto> {
        try {
            const user = await this.users.findOne({ where: { id: userId } });
            if (!user) {
                return {
                    ok: false,
                    error: '존재하지 않는 유저입니다.',
                };
            }
            const todo = await this.todos.save(
                this.todos.create({ user, content, feel }),
            );

            return {
                ok: true,
                todoId: todo.id,
            };
        } catch (error) {
            return {
                ok: false,
                error: 'To-Do 생성 실패',
            };
        }
    }

    // 유저 To-Do 수정
    async editTodo(
        userId: number,
        todoId: number,
        editTodoRequestDto: EditTodoRequestDto,
    ): Promise<EditTodoResponseDto> {
        try {
            // findOrFail: 해당 조건에 맞는 데이터가 없으면 에러를 발생시킨다.
            const todo = await this.todos.findOneOrFail({
                where: { id: todoId },
                relations: ['user'],
            });

            // 해당 유저가 아닌 경우
            if (todo.user.id !== userId) {
                throw new Error('해당 유저가 아닙니다!!!');
            }

            await this.todos.save({
                ...todo,
                ...editTodoRequestDto,
            });
            return {
                ok: true,
            };
        } catch (error) {
            return {
                ok: false,
                error: `To-Do 수정 실패 ${error.message}`,
            };
        }
    }
    // 유저 To-Do 삭제
    async deleteTodo(
        userId: number,
        todoId: number,
    ): Promise<DeleteTodoResponseDto> {
        try {
            const todo = await this.todos.findOneOrFail({
                where: { id: todoId },
                relations: ['user'],
            });

            // 해당 유저가 아닌 경우
            if (todo.user.id !== userId) {
                throw new Error('해당 유저가 아닙니다!!!');
            }

            await this.todos.remove(todo);
            return {
                ok: true,
            };
        } catch (error) {
            return {
                ok: false,
                error: `To-Do 수정 실패 ${error.message}`,
            };
        }
    }
}

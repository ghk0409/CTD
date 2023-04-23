import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { TodoEntity } from '../entities/todo.entity';
import { CoreResponse } from 'src/common/dtos/core.dto';

class TodoList extends PickType(TodoEntity, [
    'id',
    'content',
    'feel',
    'status',
]) {}

export class ListTodoResponseDto extends PartialType(CoreResponse) {
    @ApiProperty({
        example: {
            data: {
                userId: 1,
                todos: [
                    { id: 1, content: 'test', feel: 'happy', status: 'doing' },
                ],
            },
        },
        description: 'To-Do 리스트',
    })
    data?: {
        userId: number;
        todos: TodoList[];
    };
}

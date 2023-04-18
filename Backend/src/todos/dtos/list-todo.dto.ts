import { PartialType, PickType } from '@nestjs/swagger';
import { TodoEntity } from '../entities/todo.entity';
import { CoreResponse } from 'src/common/dtos/core.dto';

class TodoList extends PickType(TodoEntity, [
    'id',
    'content',
    'feel',
    'status',
]) {}

export class ListTodoResponseDto extends PartialType(CoreResponse) {
    data?: TodoList[];
}

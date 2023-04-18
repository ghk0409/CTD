import { PartialType, PickType } from '@nestjs/swagger';
import { CoreResponse } from 'src/common/dtos/core.dto';
import { TodoEntity } from '../entities/todo.entity';

export class CreateTodoRequestDto extends PickType(TodoEntity, [
    'content',
    'feel',
]) {}

export class CreateTodoResponseDto extends PartialType(CoreResponse) {
    todoId?: number;
}

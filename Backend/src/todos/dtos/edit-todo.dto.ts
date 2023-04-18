import { PartialType, PickType } from '@nestjs/swagger';
import { TodoEntity } from '../entities/todo.entity';
import { CoreResponse } from 'src/common/dtos/core.dto';

export class EditTodoRequestDto extends PartialType(
    PickType(TodoEntity, ['content', 'feel', 'status']),
) {}

export class EditTodoResponseDto extends PartialType(CoreResponse) {}

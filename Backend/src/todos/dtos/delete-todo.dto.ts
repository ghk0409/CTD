import { PartialType } from '@nestjs/swagger';
import { CoreResponse } from 'src/common/dtos/core.dto';

export class DeleteTodoResponseDto extends PartialType(CoreResponse) {}

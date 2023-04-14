import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { CoreResponse } from 'src/common/dtos/core.dto';

export class CreateAccountRequestDto extends PickType(UserEntity, [
    'email',
    'password',
]) {}

export class CreateAccountResponseDto extends PartialType(CoreResponse) {}

import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/core.dto';

export class CreateAccountInput extends PickType(UserEntity, [
    'email',
    'password',
]) {}

export class CreateAccountOutput extends PartialType(CoreOutput) {}

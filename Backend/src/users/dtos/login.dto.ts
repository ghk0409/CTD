import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { CoreResponse } from 'src/common/dtos/core.dto';

export class LoginRequestDto extends PickType(UserEntity, [
    'email',
    'password',
]) {}

export class LoginResponseDto extends CoreResponse {
    @ApiProperty({ example: '13uda3w489ua', description: 'jwt 인증용 토큰값' })
    token?: string;
}

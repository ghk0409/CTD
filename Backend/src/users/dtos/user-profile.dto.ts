import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { CoreResponse } from 'src/common/dtos/core.dto';

// 유저 프로필 조회용 인터페이스
class Userprofile extends PickType(UserEntity, ['id', 'email', 'nickname']) {}

export class UserProfileResponseDto extends CoreResponse {
    @ApiProperty({
        example: {
            id: 999,
            email: 'test@test.com',
            nickname: '배고픈 강철이빨',
        },
        description: 'jwt 인증된 유저 정보',
    })
    user?: Userprofile;
}

export class UserProfileEditRequestDto extends PartialType(
    PickType(UserEntity, ['id', 'password', 'nickname']),
) {}

export class UserProfileEditResponseDto extends CoreResponse {}

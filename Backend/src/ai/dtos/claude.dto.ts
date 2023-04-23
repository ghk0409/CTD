import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CoreResponse } from 'src/common/dtos/core.dto';

export class ClaudeRequestDto {}

export class ClaudeResponseDto extends PartialType(CoreResponse) {
    @ApiProperty({
        example: {
            data: {
                userId: 1,
                claude: '클로드 API 결과',
            },
        },
    })
    data?: {
        userId: number;
        claude: string;
    };
}

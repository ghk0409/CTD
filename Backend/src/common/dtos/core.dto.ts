import { ApiProperty } from '@nestjs/swagger';

export class CoreOutput {
    @ApiProperty({
        example: '이미 존재하는 이메일입니다.',
        description: '에러 메시지(nullable)',
    })
    error?: string;

    @ApiProperty({ example: true, description: '성공 여부' })
    ok: boolean;
}

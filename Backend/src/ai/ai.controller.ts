import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ClaudeResponseDto } from './dtos/claude.dto';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('클로드 API')
@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('/claude')
    @HttpCode(201)
    @ApiOperation({
        summary: '클로드 API',
        description:
            '클로드를 호출한다. 로그인 상태의 유저만 호출 가능. 토큰만 넘기면 됨',
    })
    @ApiCreatedResponse({
        description: '클로드 호출 성공',
        type: ClaudeResponseDto,
    })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async claude(@AuthUser() authUser: UserEntity): Promise<any> {
        return this.aiService.claude(authUser.id);
    }
}

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
    CreateAccountInput,
    CreateAccountOutput,
} from './dtos/create-account.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // 유저 회원가입
    @Post('/join')
    @HttpCode(201)
    @ApiOperation({
        summary: '유저 회원가입 API',
        description: '유저를 생성한다',
    })
    @ApiCreatedResponse({
        description: '유저 회원가입 성공',
        type: CreateAccountOutput,
    })
    @ApiBody({ type: CreateAccountInput })
    async createAccount(
        @Body() createAccountInput: CreateAccountInput,
    ): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(createAccountInput);
    }
}

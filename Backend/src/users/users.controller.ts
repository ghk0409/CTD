import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
    CreateAccountInput,
    CreateAccountOutput,
} from './dtos/create-account.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // 유저 회원가입
    @Post('/join')
    @HttpCode(201)
    async createAccount(
        @Body() createAccountInput: CreateAccountInput,
    ): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(createAccountInput);
    }
}

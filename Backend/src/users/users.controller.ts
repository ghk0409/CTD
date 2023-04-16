import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
    CreateAccountRequestDto,
    CreateAccountResponseDto,
} from './dtos/create-account.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/join')
    @HttpCode(201)
    @ApiOperation({
        summary: '유저 회원가입 API',
        description: '유저를 생성한다',
    })
    @ApiCreatedResponse({
        description: '유저 회원가입 성공',
        type: CreateAccountResponseDto,
    })
    @ApiBody({ type: CreateAccountRequestDto })
    async createAccount(
        @Body() createAccountRequestDto: CreateAccountRequestDto,
    ): Promise<CreateAccountResponseDto> {
        return this.usersService.createAccount(createAccountRequestDto);
    }

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({
        summary: '유저 로그인 API',
        description: '유저 로그인을 한다',
    })
    @ApiCreatedResponse({
        description: '유저 로그인 성공',
        type: LoginResponseDto,
    })
    @ApiBody({ type: LoginRequestDto })
    async login(
        @Body() loginInput: LoginRequestDto,
    ): Promise<LoginResponseDto> {
        return this.usersService.login(loginInput);
    }

    @Get('/profile')
    @HttpCode(200)
    @ApiOperation({
        summary: '유저 프로필 조회 API',
        description: '유저 프로필을 조회한다',
    })
    @ApiCreatedResponse({
        description: '유저 프로필 조회 성공',
        // type: UserProfileResponseDto,
    })
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        return req.user;
    }
}

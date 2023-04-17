import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
    CreateAccountRequestDto,
    CreateAccountResponseDto,
} from './dtos/create-account.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserEntity } from './entities/user.entity';
import {
    UserProfileEditRequestDto,
    UserProfileEditResponseDto,
    UserProfileResponseDto,
} from './dtos/user-profile.dto';

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
        type: UserProfileResponseDto,
    })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async getProfile(
        @AuthUser() authUser: UserEntity,
    ): Promise<UserProfileResponseDto> {
        console.log(authUser);
        return this.usersService.getProfile(authUser);
    }

    @Post('/profile')
    @HttpCode(201)
    @ApiOperation({
        summary: '유저 프로필 수정 API',
        description: '유저 프로필을 수정한다',
    })
    @ApiCreatedResponse({
        description: '유저 프로필 수정 성공',
        type: UserProfileEditRequestDto,
    })
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async editProfile(
        @AuthUser() authUser: UserEntity,
        @Body() userProfileEditRequestDto: UserProfileEditRequestDto,
    ): Promise<UserProfileEditResponseDto> {
        console.log(authUser);
        console.log(userProfileEditRequestDto);
        return this.usersService.editProfile(
            authUser.id,
            userProfileEditRequestDto,
        );
    }
}

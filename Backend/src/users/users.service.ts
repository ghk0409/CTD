import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
    CreateAccountRequestDto,
    CreateAccountResponseDto,
} from './dtos/create-account.dto';
import { HttpService } from '@nestjs/axios';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { AuthService } from 'src/auth/auth.service';
import {
    UserProfileEditRequestDto,
    UserProfileEditResponseDto,
    UserProfileResponseDto,
} from './dtos/user-profile.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly users: Repository<UserEntity>,
        private readonly httpService: HttpService,
        private readonly authService: AuthService,
    ) {}

    // 유저 회원가입
    async createAccount({
        email,
        password,
    }: CreateAccountRequestDto): Promise<CreateAccountResponseDto> {
        try {
            const exist = await this.users.findOne({ where: { email } });
            // 이메일 중복 유저 확인
            if (exist) {
                return {
                    ok: false,
                    error: '이미 존재하는 이메일입니다.',
                };
            }

            // 랜덤 닉네임 생성
            let nickname: string;
            await this.httpService
                .get(
                    'https://nickname.hwanmoo.kr/?format=json&count=1&max_length=10',
                )
                .forEach((res) => {
                    nickname = res.data?.words?.[0];
                });

            // 랜덤 닉네임 생성 실패 시 기본 닉네임
            if (!nickname) nickname = '닉네임 바꿔주세요';

            // 유저 생성
            await this.users.save(
                this.users.create({ email, password, nickname }),
            );

            return { ok: true };
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }

    // 유저 로그인
    async login({
        email,
        password,
    }: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            // 1. find the user with the email
            const user = await this.users.findOne({ where: { email } });
            // 해당 유저가 존재하지 않을 경우
            if (!user) {
                return {
                    ok: false,
                    error: '해당 이메일이 존재하지 않습니다. 다시 한 번 확인해주세요^^',
                };
            }
            // 2. check if the password is correct
            const checkPassword = await user.checkPassword(password);
            // 패스워드 일치하지 않을 경우
            if (!checkPassword) {
                return {
                    ok: false,
                    error: '비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요^^',
                };
            }
            // 3. make a JWT and give it to the user
            const token = await this.authService.sign({
                userId: user.id,
                email: user.email,
            });

            return {
                ok: true,
                token,
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                error,
            };
        }
    }

    // 유저 정보 조회
    async getProfile({ id }): Promise<UserProfileResponseDto> {
        try {
            const user = await this.users.findOne({ where: { id } });
            if (!user) {
                return {
                    ok: false,
                    error: '해당 유저가 존재하지 않습니다.',
                };
            }
            return {
                ok: true,
                user: {
                    id: user.id,
                    email: user.email,
                    nickname: user.nickname,
                },
            };
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }

    // 유저 정보 수정
    async editProfile(
        userId: number,
        { email, password, nickname }: UserProfileEditRequestDto,
    ): Promise<UserProfileEditResponseDto> {
        try {
            const user = await this.users.findOne({ where: { id: userId } });
            if (!user) {
                return {
                    ok: false,
                    error: '해당 유저가 존재하지 않습니다.',
                };
            }

            // 이메일 수정
            if (email) {
                user.email = email;
                user.verified = false;
                // 이메일 인증 테이블 데이터 생성 및 인증 이메일 발송 : TODO
            }
            // 패스워드 수정
            if (password) {
                user.password = password;
            }
            // 닉네임 수정
            if (nickname) {
                user.nickname = nickname;
            }

            await this.users.save(user);

            return {
                ok: true,
            };
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
}

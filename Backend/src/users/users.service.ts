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

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly users: Repository<UserEntity>,
        private readonly httpService: HttpService,
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
            // 3. make a JWT and give it to the user #TODO

            return {
                ok: true,
                token: '#eaf!9dasfoi',
            };
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
}

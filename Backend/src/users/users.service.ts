import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
    CreateAccountInput,
    CreateAccountOutput,
} from './dtos/create-account.dto';
import { HttpService } from '@nestjs/axios';

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
    }: CreateAccountInput): Promise<CreateAccountOutput> {
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
}

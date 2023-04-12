import { HttpService } from '@nestjs/axios';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends CoreEntity {
    constructor(private readonly httpService: HttpService) {
        super();
    }
    // 유저 이메일 컬럼 (unique)
    @Column({ unique: true, comment: '유저 이메일' })
    @IsEmail()
    email: string;

    // 유저 패스워드 컬럼 (추후 암호화 필요)
    @Column({ comment: '유저 패스워드' })
    @IsString()
    password: string;

    // 유저 닉네임 컬럼 (랜덤 생성)
    @Column({ comment: '유저 닉네임' })
    @IsString()
    nickname: string;

    // 유저 이메일 인증 여부
    @Column({ default: false, comment: '유저 이메일 인증 여부' })
    @IsBoolean()
    verified: boolean;

    // 유저 닉네임 랜덤 생성 메서드 (회원가입 시만 적용)
    // @BeforeInsert()
    // _generateNickname(): void {
    //     // const randomNick = this.httpService.get(
    //     //     'https://nickname.hwanmoo.kr/?format=json&count=2',
    //     // );
    //     // console.log(randomNick);
    //     this.nickname = 'test123123';
    // }
}

import { HttpService } from '@nestjs/axios';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends CoreEntity {
    constructor(private readonly httpService: HttpService) {
        super();
    }

    @ApiProperty({ example: 'test@test.com', description: '유저 이메일' })
    @Column({ unique: true, comment: '유저 이메일' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '1234', description: '유저 패스워드' })
    @Column({ comment: '유저 패스워드' })
    @IsString()
    password: string;

    @ApiProperty({ example: '먹고난 치즈케이크', description: '유저 닉네임' })
    @Column({ comment: '유저 닉네임' })
    @IsString()
    nickname: string;

    @ApiProperty({ example: false, description: '유저 이메일 인증 여부' })
    @Column({ default: false, comment: '유저 이메일 인증 여부' })
    @IsBoolean()
    verified: boolean;
}

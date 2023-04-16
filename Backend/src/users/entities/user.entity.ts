import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class UserEntity extends CoreEntity {
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

    // 패스워드 해싱
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    // 패스워드 체크
    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}

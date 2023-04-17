import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

// enum 설정
// 기본, 좋음, 죽음, 흥미, 행복, 중립, 슬픔, 아픔 (0 ~ 7)
enum Feel {
    DEFAULT,
    GOOD,
    DEATH,
    INTEREST,
    HAPPY,
    NEUTRAL,
    SAD,
    PAIN,
}
// 할 일, 완료 (0, 1)
enum Status {
    DOING,
    DONE,
}

@Entity()
export class TodoEntity extends CoreEntity {
    @ApiProperty({ example: '1234', description: '유저 ToDo 항목' })
    @Column({ comment: '유저 ToDo 항목' })
    @IsString()
    content: string;

    @ApiProperty({
        example: 'DOING',
        description: '유저 ToDo 상태(enum 타입으로 DB 저장 시, 숫자로 저장됨)',
    })
    @Column({ type: 'enum', enum: Status, comment: '유저 ToDo 상태' })
    @IsEnum(Status)
    status: Status;

    @ApiProperty({
        example: 'GOOD',
        description: '유저 ToDo 기분(enum 타입으로 DB 저장 시, 숫자로 저장됨)',
    })
    @Column({ type: 'enum', enum: Feel, comment: '유저 ToDo 기분' })
    @IsEnum(Feel)
    feel: Feel;

    @ApiProperty({ example: 121, description: '해당 ToDo 유저 ID' })
    @OneToOne((type) => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: UserEntity;
}

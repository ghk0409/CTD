import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';

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
    @ApiProperty({
        example: '모닝 스트레칭하기',
        description: '유저 ToDo 항목',
    })
    @Column({ comment: '유저 ToDo 항목' })
    @IsString()
    content: string;

    @ApiProperty({
        example: 0,
        description: '유저 ToDo 상태(enum 타입으로 0, 1 number)',
    })
    @Column({
        type: 'enum',
        enum: Status,
        default: Status.DOING,
        comment: '유저 ToDo 상태',
    })
    @IsEnum(Status)
    status: Status;

    @ApiProperty({
        example: 1,
        description: '유저 ToDo 기분(enum 타입으로 0 ~ 7 number)',
    })
    @Column({
        type: 'enum',
        enum: Feel,
        default: Feel.DEFAULT,
        comment: '유저 ToDo 기분',
    })
    @IsEnum(Feel)
    feel: Feel;

    // ManyToOne: UserEntity와 1:N 관계 (1명의 유저는 여러 개의 ToDo를 가질 수 있음)
    @ApiProperty({ example: 121, description: '해당 ToDo 유저 ID' })
    @ManyToOne((type) => UserEntity, { onDelete: 'CASCADE' }) // 유저 삭제 시 해당 유저의 모든 ToDo 삭제
    @JoinColumn()
    user: UserEntity;
}

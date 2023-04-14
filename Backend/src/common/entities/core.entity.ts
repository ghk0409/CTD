import { ApiProperty } from '@nestjs/swagger';
import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

// CoreEntity는 모든 Entity가 상속받는 클래스
export class CoreEntity {
    // primary key - id (auto increment)
    @ApiProperty({ example: 1, description: '유저ID (auto increment)' })
    @PrimaryGeneratedColumn({ comment: '유저ID (auto increment)' })
    id: number;

    // 생성일자
    @ApiProperty({ example: '2023-08-01 00:00:00', description: '생성일자' })
    @CreateDateColumn({ comment: '생성일자' })
    createdAt: Date;

    // 수정일자
    @ApiProperty({ example: '2023-08-01 00:00:00', description: '수정일자' })
    @UpdateDateColumn({ comment: '수정일자' })
    updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entities/core.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class AiEntity extends CoreEntity {
    @ApiProperty({
        example: '당신의 투두 리스트는 별로군요?',
        description: 'AI가 생성한 문장',
    })
    @Column({ type: 'text', comment: 'AI가 생성한 문장' })
    sentence: string;

    @ApiProperty({
        example: 1,
        description:
            '유저 ID, One-to-One 관계로 유저마다 1개의 Claude API 결과를 가짐',
    })
    @OneToOne((type) => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: UserEntity;
}

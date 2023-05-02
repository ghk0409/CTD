import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ulid } from 'ulid';

@Entity()
export class VerificationEntity extends CoreEntity {
    // 이메일 인증을 위한 코드값
    @Column()
    code: string;

    // User와 Verification은 1:1 관계
    // Verification에서 User로 접근
    @OneToOne((type) => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: UserEntity;

    // 랜덤 코드 생성
    @BeforeInsert()
    createCode(): void {
        // ulid 이용한 랜덤 코드 생성
        this.code = ulid();
    }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// jwt 토큰 검증 전략 설정
// jwt 토큰 검증 후 토큰에 담긴 정보를 req.user에 저장
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    async validate(payload: any) {
        // jwt 토큰 검증 후 토큰에 담긴 정보를 req.user에 저장 (userId는 User 테이블의 id와 매핑되도록 이름 변경)
        return { id: payload.userId, email: payload.email };
    }
}

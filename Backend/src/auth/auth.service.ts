import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    // jwt 토큰 생성
    async sign(payload: any) {
        return this.jwtService.sign(payload);
    }

    // jwt 토큰 검증
    async verify(token: string) {
        return this.jwtService.verify(token);
    }
}

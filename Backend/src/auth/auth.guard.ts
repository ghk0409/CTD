import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 해당 guard를 사용하면 jwt 토큰 검증 전략을 사용하게 됨
// jwt 토큰 검증 전략은 Backend/src/auth/auth.jwt-strategy.ts 참고
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

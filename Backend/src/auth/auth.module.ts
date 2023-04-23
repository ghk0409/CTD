import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.jwt-strategy';

@Module({
    imports: [
        // .env 가져오는게 비동기라서 registerAsync 사용
        // Error: secretOrPrivateKey must have a value 방지
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'),
                signOptions: { expiresIn: '1d' },
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
@Global()
export class AuthModule {}

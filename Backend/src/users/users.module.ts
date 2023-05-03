import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { VerificationEntity } from './entities/verification.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, VerificationEntity]),
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5,
            }),
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, MailService],
})
export class UsersModule {}

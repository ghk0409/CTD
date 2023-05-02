import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendVerificationEmail(email: string, code: string): Promise<boolean> {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'CTD 회원 가입 인증 메일',
                html: `<h1>이메일 인증</h1><p>회원 승인을 위해 하단 버튼을 클릭해주세요.</p><p>${code}</p>`,
            });

            return true;
        } catch (error) {
            return false;
        }
    }
}

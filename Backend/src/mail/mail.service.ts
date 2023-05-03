import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendVerificationEmail(email: string, code: string): Promise<boolean> {
        try {
            await this.mailerService.sendMail({
                to: email,
                // from: '보내는 사람 메일 주소'
                subject: 'CTD 회원 가입 인증 메일',
                text: '이메일 인증',
                html: `<h1>이메일 인증</h1><p>회원 승인을 위해 하단 버튼을 클릭해주세요.`,
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

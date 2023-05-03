import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModuleOption } from './mail.interface';
import { MailService } from './mail.service';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

@Module({})
export class MailModule {
    static forRoot(options: MailModuleOption): DynamicModule {
        return {
            module: MailModule,
            imports: [
                MailerModule.forRootAsync({
                    useFactory: () => ({
                        transport: {
                            service: options.MAIL_SERVICE,
                            host: options.MAIL_HOST,
                            port: options.MAIL_PORT,
                            secure: true,
                            auth: {
                                user: options.MAIL_USER,
                                pass: options.MAIL_PASSWORD,
                            },
                        },
                        // 'smtps://user@domain.com:pass@smtp.domain.com',
                        defaults: {
                            from: options.MAIL_FROM,
                        },
                        template: {
                            dir: __dirname + '/templates',
                            adapter: new HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                        preview: false,
                    }),
                }),
            ],
            providers: [
                { provide: CONFIG_OPTIONS, useValue: options },
                MailService,
            ],
            exports: [MailService],
        };
    }
}

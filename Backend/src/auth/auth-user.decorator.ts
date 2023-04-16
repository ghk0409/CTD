import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const user = context['user'];
        return user;
    },
);

import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export class SessionGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        try {
            if (request.session.admin) {
                return true;
            }
        } catch (e) {
            throw new UnauthorizedException();
        }

    }
}

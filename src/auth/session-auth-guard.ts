import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionAuthGuard extends PassportAuthGuard('local') implements CanActivate {
    public async canActivate(
        context: ExecutionContext,
    ): Promise<any> {
        console.log(243, context)
        const request = context.switchToHttp().getRequest();
        const result = await super.canActivate(context);
        console.log(111, result)
        await super.logIn(request);

        return result;
    }
}

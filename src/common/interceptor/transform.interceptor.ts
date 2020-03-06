import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ApiErrorCode } from '../enums/error_code';

interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        const res = {
          code: ApiErrorCode.SUCCESS,
          msg: 'success',
          data
        }
        return res
      }),
    )
  }
  // doLog(context: ExecutionContext, res: Response<T>): void {
  //   const ctx = context.switchToHttp()
  //   const request: Request = ctx.getRequest()
  //   const { url, headers, method, body } = request
  //   const ua = headers['user-agent']
  //
  //   this.logger.log(
  //     `${method} ${url} ${ua} ${JSON.stringify(body)} ${JSON.stringify(res)}`
  //   )
  // }
}

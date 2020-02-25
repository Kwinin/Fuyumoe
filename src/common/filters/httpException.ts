import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import { ApiErrorCode } from '../enums/error_code';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus()
    switch (true) {
      case exception instanceof ApiException:
        response
          .status(status)
          .json({
            errorCode: exception.getErrorCode(),
            message: exception.getErrorMessage(),
            date: new Date().toLocaleString(),
            path: request.url,
          });
        break
      case exception.response.error === 'Forbidden':
        response
          .status(400)
          .json({
            errorCode: ApiErrorCode.USER_LOGIN_INVALID,
            message: exception.response.message,
            date: new Date().toLocaleString(),
            path: request.url,
          });
        break
      default:
        response
          .status(status)
          .json({
            ...exception.response,
            date: new Date().toLocaleString(),
            path: request.url,
          });
    }
  }
}

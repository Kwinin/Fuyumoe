import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import { ApiErrorCode } from '../enums/error_code';
import { Logger } from '../../helper/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus()
    switch (true) {
      case exception instanceof ApiException:
        Logger.warn('ApiException', JSON.stringify(exception))
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
        Logger.warn('Forbidden', JSON.stringify(exception))
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
        Logger.error('Exception', JSON.stringify(exception))
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

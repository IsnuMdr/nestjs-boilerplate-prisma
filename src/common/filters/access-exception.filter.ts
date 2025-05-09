import {
  FORBIDDEN_RESOURCE,
  UNAUTHORIZED_RESOURCE,
} from '@constants/error.constant';
import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

interface ExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch(UnauthorizedException, ForbiddenException)
export class AccessExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: UnauthorizedException | ForbiddenException,
    host: ArgumentsHost,
  ) {
    if (exception instanceof UnauthorizedException) {
      return this.catchUnauthorizedException(exception, host);
    }
    if (exception instanceof ForbiddenException) {
      return this.catchForbiddenException(exception, host);
    }
  }

  private catchUnauthorizedException(
    exception: UnauthorizedException,
    host: ArgumentsHost,
  ) {
    const statusCode: number = exception.getStatus() || HttpStatus.UNAUTHORIZED;
    const exceptionResponse = exception?.getResponse();

    const details =
      exceptionResponse instanceof Object
        ? (exceptionResponse as ExceptionResponse)
        : null;

    const [serverErrorCode] = UNAUTHORIZED_RESOURCE.split(':');

    super.catch(
      new HttpException(
        {
          status: false,
          message: exception.message,
          code: parseInt(serverErrorCode, 10),
          error: details?.error,
        },
        statusCode,
      ),
      host,
    );

    Logger.error(exception, 'UnauthorizedExceptionFilter');
  }

  private catchForbiddenException(
    exception: ForbiddenException,
    host: ArgumentsHost,
  ) {
    const statusCode: number = exception.getStatus() || HttpStatus.FORBIDDEN;
    const exceptionResponse = exception?.getResponse();

    const details =
      exceptionResponse instanceof Object
        ? (exceptionResponse as ExceptionResponse)
        : null;

    const [serverErrorCode] = FORBIDDEN_RESOURCE.split(':');

    super.catch(
      new HttpException(
        {
          status: false,
          message: exception.message,
          code: parseInt(serverErrorCode, 10),
          error: details?.error,
        },
        statusCode,
      ),
      host,
    );

    Logger.error(exception, 'ForbiddenExceptionFilter');
  }
}

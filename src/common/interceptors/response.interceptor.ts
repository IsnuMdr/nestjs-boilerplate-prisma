import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    // Ambil message dari metadata, default "Request successful" jika tidak ada
    const responseMessage =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, handler) ||
      'Request successful';

    return next.handle().pipe(
      map((data) => {
        const response = {
          status: true,
          message: responseMessage,
          data: data,
        };

        if (data?.data && data?.meta) {
          response.data = data.data;
          return {
            ...response,
            total: data.meta.total,
            last_page: data.meta.lastPage,
            currentPage: data.meta.currentPage,
            perPage: data.meta.perPage,
          };
        }

        return response;
      }),
    );
  }
}

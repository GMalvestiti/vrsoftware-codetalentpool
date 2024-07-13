import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponse } from '../interfaces/response.interface';

export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    return next.handle().pipe(map((response) => this.transform(response)));
  }

  private transform(response: T): IResponse<T> {
    const data = response as IResponse<T>;

    const responseFormatted = {
      message: data?.message ?? null,
      data: data?.data ?? data,
      count: data?.count ?? undefined,
    };

    return responseFormatted as IResponse<T>;
  }
}

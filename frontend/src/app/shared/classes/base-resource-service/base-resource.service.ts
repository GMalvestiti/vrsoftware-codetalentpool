import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable, take } from 'rxjs';
import { handleFindAllFilter } from '../../helpers/filter.helper';
import { IResponse } from '../../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export abstract class BaseResourceService<T> {
  private readonly _http!: HttpClient;
  private url!: string;

  constructor(
    protected readonly _injector: Injector,
    port: number,
    path: string,
  ) {
    this._http = this._injector.get(HttpClient);
    this.url = `http://localhost:${port}/api/v1/${path}`;
  }

  findGlobal(): Observable<IResponse<T[]>> {
    return this._http.get<IResponse<T[]>>(`${this.url}`).pipe(take(1));
  }

  findAll(
    page: PageEvent,
    sort: Sort,
    filter: Record<string, unknown>,
  ): Observable<IResponse<T[]>> {
    const orderParam = JSON.stringify({
      column: sort.active,
      sort: sort.direction,
    });
    const pageParam = page.pageIndex;
    const sizeParam = page.pageSize;
    const filterQuery = handleFindAllFilter(filter);

    return this._http
      .get<
        IResponse<T[]>
      >(`${this.url}/${pageParam}/${sizeParam}/${orderParam}?filter=${filterQuery}`)
      .pipe(take(1));
  }

  create(data: T): Observable<IResponse<T>> {
    return this._http.post<IResponse<T>>(this.url, data).pipe(take(1));
  }

  update(id: number, data: T): Observable<IResponse<T>> {
    return this._http
      .patch<IResponse<T>>(`${this.url}/${id}`, data)
      .pipe(take(1));
  }

  findOne(id: number): Observable<IResponse<T>> {
    return this._http.get<IResponse<T>>(`${this.url}/${id}`).pipe(take(1));
  }

  delete(id: number): Observable<IResponse<T>> {
    return this._http.delete<IResponse<T>>(`${this.url}/${id}`).pipe(take(1));
  }
}

import { Injectable, Injector } from '@angular/core';
import { Observable, take } from 'rxjs';
import { BaseResourceService } from '../shared/classes/base-resource-service/base-resource.service';
import { EAPIPath, EAPIPort } from '../shared/enums/api-info.enum';
import { IProdutoLoja } from '../shared/interfaces/produto.interface';
import { IResponse } from '../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutoLojaService extends BaseResourceService<IProdutoLoja> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPort.BACKEND, EAPIPath.PRODUTOLOJA);
  }

  findAllProdutoLoja(id: number): Observable<IResponse<IProdutoLoja[]>> {
    return this._http
      .get<IResponse<IProdutoLoja[]>>(`${this.url}/${id}`)
      .pipe(take(1));
  }
}

import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../shared/classes/base-resource-service/base-resource.service';
import { EAPIPath, EAPIPort } from '../shared/enums/api-info.enum';
import { IProduto } from '../shared/interfaces/produto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseResourceService<IProduto> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPort.BACKEND, EAPIPath.PRODUTO);
  }
}

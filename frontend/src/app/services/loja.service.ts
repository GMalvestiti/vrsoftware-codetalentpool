import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../shared/classes/base-resource-service/base-resource.service';
import { EAPIPath, EAPIPort } from '../shared/enums/api-info.enum';
import { ILoja } from '../shared/interfaces/produto.interface';

@Injectable({
  providedIn: 'root',
})
export class LojaService extends BaseResourceService<ILoja> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPort.BACKEND, EAPIPath.LOJA);
  }
}

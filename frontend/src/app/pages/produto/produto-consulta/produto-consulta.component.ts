import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { AddActionComponent } from '../../../shared/components/header/add-action/add-action.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';

const actions = [AddActionComponent];
const imports = [...actions, PageLayoutComponent, CommonModule];

@Component({
  selector: 'app-produto-consulta',
  standalone: true,
  imports,
  templateUrl: './produto-consulta.component.html',
  styleUrl: './produto-consulta.component.scss',
})
export class ProdutoConsultaComponent extends BaseConsultaComponent {
  filterFields: IFormField[] = [
    {
      type: EFieldType.INPUT,
      class: 'grid-1',
      label: 'Código',
      formControlName: 'id',
      placeholder: 'Ex.: 1',
    },
    {
      type: EFieldType.INPUT,
      class: 'grid-2',
      label: 'Descrição',
      formControlName: 'descricao',
      placeholder: 'Ex.: Arroz',
    },
    {
      type: EFieldType.INPUT,
      class: 'grid-1',
      label: 'Custo',
      formControlName: 'custo',
      placeholder: 'Ex.: 9.99',
    },
    {
      type: EFieldType.INPUT,
      class: 'grid-1',
      label: 'Preço de Venda',
      formControlName: 'precoVenda',
      placeholder: 'Ex.: 9.99',
    },
  ];

  filterFormGroup = new FormGroup({
    id: new FormControl(null),
    descricao: new FormControl(null),
    custo: new FormControl(null),
    precoVenda: new FormControl(null),
  });

  constructor(private readonly _injectorLocal: Injector) {
    super(_injectorLocal);
  }
}

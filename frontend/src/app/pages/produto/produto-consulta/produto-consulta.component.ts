import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProdutoService } from '../../../services/produto.service';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { FormFieldListComponent } from '../../../shared/components/form-field-list/form-field-list.component';
import { AddActionComponent } from '../../../shared/components/header/add-action/add-action.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { IProduto } from '../../../shared/interfaces/produto.interface';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';

const actions = [AddActionComponent];
const form = [FormFieldListComponent];
const table = [MatTableModule, MatSortModule, MatPaginatorModule];
const pipes = [FormatIdPipe];
const imports = [
  ...actions,
  ...form,
  ...table,
  ...pipes,
  PageLayoutComponent,
  CommonModule,
];

@Component({
  selector: 'app-produto-consulta',
  standalone: true,
  imports,
  templateUrl: './produto-consulta.component.html',
})
export class ProdutoConsultaComponent extends BaseConsultaComponent<IProduto> {
  displayedColumns: string[] = ['id', 'descricao', 'custo'];

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

  constructor(
    private readonly _produtoService: ProdutoService,
    private readonly _injectorLocal: Injector,
  ) {
    super(_produtoService, _injectorLocal);
  }
}

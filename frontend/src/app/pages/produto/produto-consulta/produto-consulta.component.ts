import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseConsultaComponent } from '../../../shared/classes/base-consulta/base-consulta.component';
import { AddActionComponent } from '../../../shared/components/header/add-action/add-action.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

const actions = [AddActionComponent];
const imports = [...actions, PageLayoutComponent, CommonModule];

@Component({
  selector: 'app-produto-consulta',
  standalone: true,
  imports,
  templateUrl: './produto-consulta.component.html',
  styleUrl: './produto-consulta.component.scss',
})
export class ProdutoConsultaComponent extends BaseConsultaComponent {}

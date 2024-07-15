import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldListComponent } from '../../../../shared/components/form-field-list/form-field-list.component';
import { CancelActionComponent } from '../../../../shared/components/header/cancel-action/cancel-action.component';
import { SaveActionComponent } from '../../../../shared/components/header/save-action/save-action.component';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../../shared/enums/field-type.enum';
import {
  IFormField,
  ILabelValue,
} from '../../../../shared/interfaces/form-field.interface';
import { IProdutoLoja } from '../../../../shared/interfaces/produto.interface';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    SaveActionComponent,
    CancelActionComponent,
    FormFieldListComponent,
    PageLayoutComponent,
    CommonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  lojaOptions: ILabelValue[] = [
    {
      label: 'Loja 01',
      value: 1,
    },
    {
      label: 'Loja 02',
      value: 2,
    },
    {
      label: 'Loja 03',
      value: 3,
    },
  ];

  get cadastroFormValues(): IProdutoLoja {
    return this.cadastroForm.getRawValue() as unknown as IProdutoLoja;
  }

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    idLoja: new FormControl(null, [Validators.required]),
    precoVenda: new FormControl(null, [Validators.min(0)]),
  });

  cadastroFields: IFormField[] = [
    {
      type: EFieldType.SELECT,
      class: 'grid-4',
      label: 'Loja',
      formControlName: 'idLoja',
      placeholder: '',
      options: this.lojaOptions,
    },
    {
      type: EFieldType.INPUT,
      class: 'grid-4',
      label: 'Preço de Venda (R$)',
      formControlName: 'precoVenda',
      placeholder: 'Ex.: 9.999',
    },
  ];

  save(): void {
    this.dialogRef.close(this.cadastroFormValues);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

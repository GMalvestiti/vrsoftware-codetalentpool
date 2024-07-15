import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LojaService } from '../../../../services/loja.service';
import { FormFieldListComponent } from '../../../../shared/components/form-field-list/form-field-list.component';
import { CancelActionComponent } from '../../../../shared/components/header/cancel-action/cancel-action.component';
import { SaveActionComponent } from '../../../../shared/components/header/save-action/save-action.component';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout.component';
import { SnackbarComponent } from '../../../../shared/components/snackbar/snackbar.component';
import { EFieldType } from '../../../../shared/enums/field-type.enum';
import { EMensagem } from '../../../../shared/enums/mensagem.enum';
import {
  IFormField,
  ILabelValue,
} from '../../../../shared/interfaces/form-field.interface';
import {
  ILoja,
  IProdutoLoja,
} from '../../../../shared/interfaces/produto.interface';
import { ISnackbarData } from '../../../../shared/interfaces/snackbar-data.interface';
import { PagesComponent } from '../../../pages.component';

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
    PagesComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  private lojas: ILoja[] = [];

  private readonly _lojaService: LojaService;
  private readonly _snackBar!: MatSnackBar;

  constructor(
    protected readonly _injector: Injector,
    private cdr: ChangeDetectorRef,
  ) {
    this._lojaService = this._injector.get(LojaService);
    this._snackBar = this._injector.get(MatSnackBar);
  }

  ngOnInit(): void {
    this._lojaService.findGlobal().subscribe(response => {
      this.lojas = response.data;

      this.lojaOptions = [];
      for (const loja of this.lojas) {
        this.lojaOptions.push({
          label: loja.descricao,
          value: loja.id,
        });
      }
      this.updateCadastroFields();
      this.cdr.detectChanges();
    });
  }

  lojaOptions: ILabelValue[] = [];

  get cadastroFormValues(): IProdutoLoja {
    return this.cadastroForm.getRawValue() as unknown as IProdutoLoja;
  }

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    idLoja: new FormControl(null, [Validators.required]),
    precoVenda: new FormControl(null, [Validators.min(0)]),
  });

  cadastroFields: IFormField[] = [];

  updateCadastroFields(): void {
    this.cadastroFields = [
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
  }

  save(): void {
    if (
      this.cadastroForm.invalid ||
      this.cadastroFormValues.precoVenda == null
    ) {
      this.openSnackBar({
        message: EMensagem.SNACKBAR_FORM_INVALIDO,
      });
      return;
    }

    this.dialogRef.close(this.cadastroFormValues);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  protected openSnackBar(data: ISnackbarData, duration = 5000) {
    this._snackBar.openFromComponent<SnackbarComponent, ISnackbarData>(
      SnackbarComponent,
      {
        duration,
        data,
        horizontalPosition: 'center',
      },
    );
  }
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoLojaService } from '../../../services/produtoloja.service';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { FormFieldListComponent } from '../../../shared/components/form-field-list/form-field-list.component';
import { AddActionComponent } from '../../../shared/components/header/add-action/add-action.component';
import { DeleteActionComponent } from '../../../shared/components/header/delete-action/delete-action.component';
import { SaveActionComponent } from '../../../shared/components/header/save-action/save-action.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { fileToBase64 } from '../../../shared/helpers/image.helper';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import {
  IProduto,
  IProdutoLoja,
} from '../../../shared/interfaces/produto.interface';
import { FormatCustoPipe } from '../../../shared/pipes/format-custo.pipe';
import { DialogComponent } from './dialog/dialog.component';

const actions = [
  SaveActionComponent,
  DeleteActionComponent,
  AddActionComponent,
];
const form = [FormFieldListComponent];
const pipes = [FormatCustoPipe];
const table = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  EmptyRowComponent,
];
const imports = [
  ...actions,
  ...form,
  ...pipes,
  ...table,
  PageLayoutComponent,
  CommonModule,
];

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports,
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.scss'],
})
export class ProdutoCadastroComponent
  extends BaseCadastroComponent<IProduto>
  implements AfterViewInit
{
  @ViewChild(MatTable) table!: MatTable<IProdutoLoja>;

  displayedColumns: string[] = ['loja', 'precoVenda', 'acoes'];
  dataSource: IProdutoLoja[] = [];

  private readonly _dialog!: MatDialog;

  constructor(
    private readonly _produtoService: ProdutoService,
    private readonly _produtoLojaService: ProdutoLojaService,
    protected override readonly _injector: Injector,
  ) {
    super(_produtoService, _injector);
    this._dialog = this._injector.get(MatDialog);
  }

  override afterOnInit() {
    this.search();
  }

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    descricao: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]),
    custo: new FormControl(null, [Validators.min(0)]),
    imagem: new FormControl<string | null>(null),
    produtoloja: new FormControl<IProdutoLoja[]>(
      [],
      [Validators.required, Validators.minLength(1)],
    ),
  });

  cadastroFields: IFormField[] = [
    {
      type: EFieldType.INPUT,
      class: 'grid-1',
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
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
      placeholder: 'Ex.: 9.999',
    },
    {
      type: EFieldType.IMAGE,
      class: 'grid-1',
      label: 'Imagem',
      formControlName: 'imagem',
      placeholder: '',
    },
  ];

  async beforeSave() {
    const image = this.cadastroForm.get('imagem')?.value;

    if (image) {
      const file = new File([image], 'filename');
      const base64 = await fileToBase64(file);

      this.cadastroForm.get('imagem')?.setValue(base64);
    }

    this.cadastroForm.get('produtoloja')?.setValue(this.dataSource);

    this.save();
  }

  search() {
    if (this.idEdit) {
      this._produtoLojaService
        .findAllProdutoLoja(this.idEdit)
        .subscribe(response => {
          this.dataSource = response.data;
        });
    }
  }

  editar(id: number): void {
    console.log(id);
  }

  deleteProdutoLoja(id: number) {
    if (!this.idEdit) {
      this.dataSource = this.dataSource.filter(
        produtoLoja => produtoLoja.id !== id,
      );
    } else {
      if (this.dataSource.length <= 1) {
        return;
      }

      const idNull = this.dataSource.find(
        produtoLoja => produtoLoja.id == null,
      );

      if (idNull) {
        this.dataSource = this.dataSource.filter(
          produtoLoja => produtoLoja.id !== id,
        );
        this.table.renderRows();
      } else {
        this._produtoLojaService.delete(id).subscribe(() => {
          this.search();
        });
      }
    }
  }

  openDialog() {
    const dialogRef = this._dialog.open(DialogComponent, {
      disableClose: true,
      width: '600px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.precoVenda = Number(result.precoVenda);

        let found = false;
        this.dataSource.map(produtoLoja => {
          if (produtoLoja.idLoja == result.idLoja) {
            produtoLoja.precoVenda = result.precoVenda;
            found = true;
          }
        });

        if (!found) {
          result.idProduto = this.idEdit;
          this.dataSource.push(result);
          this.table.renderRows();
        } else {
          this.openSnackBar({
            message: EMensagem.SNACKBAR_PRODUTO_DIALOG_PRECO_VENDA,
          });
        }
      }
    });
  }
}

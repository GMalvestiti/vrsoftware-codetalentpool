import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { EMensagem } from '../../enums/mensagem.enum';
import { IFormField } from '../../interfaces/form-field.interface';
import { ISnackbarData } from '../../interfaces/snackbar-data.interface';
import { BaseResourceService } from '../base-resource-service/base-resource.service';

@Component({ template: '' })
export abstract class BaseCadastroComponent<T extends { id: number }>
  implements OnInit, AfterViewInit
{
  abstract cadastroFields: IFormField[];
  abstract cadastroForm: FormGroup;

  get cadastroFormValues(): T {
    return this.cadastroForm.getRawValue() as T;
  }

  protected initialFormValues!: T;
  protected idEdit!: number;

  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;
  private readonly _snackBar!: MatSnackBar;

  constructor(
    private readonly _service: BaseResourceService<T>,
    protected readonly _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
    this._snackBar = this._injector.get(MatSnackBar);
  }

  ngOnInit() {
    this.handleState();
    this.afterOnInit();
  }

  afterOnInit(): void {
    return;
  }

  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  afterViewInit(): void {
    return;
  }

  protected navigateToCadastro(): void {
    this._router.navigate([`../../cadastro`], { relativeTo: this._route });
  }

  protected navigateToEditar(id: number): void {
    this._router.navigate([`../../cadastro/${id}`], {
      relativeTo: this._route,
    });
  }

  protected buildPatchValuesFormEdit(payload: T): T {
    return payload;
  }

  protected patchFormForEdit(payload: T): void {
    const values = this.buildPatchValuesFormEdit(payload);
    this.cadastroForm.patchValue({ ...values });
  }

  protected handleState(): void {
    const id = this._route.snapshot.params['id'];

    if (!id) {
      return;
    }

    if (isNaN(Number(id))) {
      return this.navigateToCadastro();
    }

    this.idEdit = Number(id);

    this._service.findOne(this.idEdit).subscribe(response => {
      if (!response.data) {
        return this.navigateToCadastro();
      }

      this.patchFormForEdit(response.data);
    });
  }

  save() {
    this.cadastroForm.markAllAsTouched();

    if (!this.cadastroForm.valid) {
      this.openSnackBar({
        message: EMensagem.SNACKBAR_FORM_INVALIDO
      })
      return;
    }

    if (this.cadastroFormValues === this.initialFormValues) {
      return;
    }

    if (this.idEdit) {
      this.saveEditar();
    } else {
      this.saveCadastro();
    }
  }

  protected saveEditar(): void {
    this._service
      .update(this.idEdit, this.cadastroFormValues)
      .subscribe(response => {
        this.actionsAfterUpdate(response.data);
      });
  }

  protected actionsAfterUpdate(data: T): void {
    this.cadastroForm.markAsUntouched();
    this.navigateToEditar(data.id);
    console.log('Atualizado com sucesso');
  }

  protected saveCadastro(): void {
    this._service.create(this.cadastroFormValues).subscribe(response => {
      this.actionsAfterSave(response.data);
    });
  }

  protected actionsAfterSave(data: T): void {
    this.cadastroForm.markAsUntouched();
    this.navigateToEditar(data.id);
  }

  delete() {
    if (!this.idEdit) return;

    this._service.delete(this.idEdit).subscribe(() => {
      this.navigateToCadastro();
    });
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

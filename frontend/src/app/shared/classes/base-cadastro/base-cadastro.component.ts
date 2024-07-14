import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormField } from '../../interfaces/form-field.interface';
import { BaseResourceService } from '../base-resource-service/base-resource.service';

@Component({ template: '' })
export abstract class BaseCadastroComponent<T extends { id: number }>
  implements OnInit
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

  constructor(
    private readonly _service: BaseResourceService<T>,
    protected readonly _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.handleState();
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
}

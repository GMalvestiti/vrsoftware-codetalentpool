import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormField } from '../../interfaces/form-field.interface';

@Component({ template: '' })
export abstract class BaseConsultaComponent {
  abstract filterFields: IFormField[];
  abstract filterFormGroup: FormGroup;

  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;

  constructor(private readonly _injector: Injector) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
  }
}

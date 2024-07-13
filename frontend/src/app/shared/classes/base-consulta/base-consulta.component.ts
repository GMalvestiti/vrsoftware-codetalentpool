import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { getPaginatorIntl } from '../../helpers/paginator-intl.helper';
import { IFormField } from '../../interfaces/form-field.interface';
import { BaseResourceService } from '../base-resource-service/base-resource.service';

@Component({ template: '' })
export abstract class BaseConsultaComponent<T>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginatorEl!: MatPaginator;

  abstract displayedColumns: string[];
  dataSource = new MatTableDataSource<T>([]);

  sort: Sort = { active: 'id', direction: '' };
  page: PageEvent = { pageIndex: 0, pageSize: 5, length: 0 };

  abstract filterFields: IFormField[];
  abstract filterFormGroup: FormGroup;

  get filterValues() {
    return this.filterFormGroup.getRawValue();
  }

  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;

  constructor(
    private readonly _service: BaseResourceService<T>,
    private readonly _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.search();
  }

  ngAfterViewInit(): void {
    this.paginatorEl._intl = getPaginatorIntl(this.paginatorEl._intl);
  }

  applySort(sort: Sort) {
    this.sort = sort;
    this.search();
  }

  applyPage(page: PageEvent) {
    this.page = page;
    this.search();
  }

  search() {
    this._service
      .findAll(this.page, this.sort, this.filterValues)
      .subscribe(response => {
        this.dataSource.data = response.data;
        this.paginatorEl.length = response.count as number;
      });
  }

  searchGlobal() {
    this._service.findGlobal().subscribe(response => {
      this.dataSource.data = response.data;
      this.paginatorEl.length = response.count as number;
    });
  }
}

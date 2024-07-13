import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseConsultaComponent } from './base-consulta.component';

describe('BaseConsultaComponent', () => {
  let component: BaseConsultaComponent;
  let fixture: ComponentFixture<BaseConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

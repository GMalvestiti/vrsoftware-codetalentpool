import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCadastroComponent } from './base-cadastro.component';

describe('BaseCadastroComponent', () => {
  let component: BaseCadastroComponent;
  let fixture: ComponentFixture<BaseCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

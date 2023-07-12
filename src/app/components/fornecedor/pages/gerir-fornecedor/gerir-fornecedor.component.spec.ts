import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirFornecedorComponent } from './gerir-fornecedor.component';

describe('GerirFornecedorComponent', () => {
  let component: GerirFornecedorComponent;
  let fixture: ComponentFixture<GerirFornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirFornecedorComponent]
    });
    fixture = TestBed.createComponent(GerirFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFornecedorComponent } from './new-fornecedor.component';

describe('NewFornecedorComponent', () => {
  let component: NewFornecedorComponent;
  let fixture: ComponentFixture<NewFornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFornecedorComponent]
    });
    fixture = TestBed.createComponent(NewFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

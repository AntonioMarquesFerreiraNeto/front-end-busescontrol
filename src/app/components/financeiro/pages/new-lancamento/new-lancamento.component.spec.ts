import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLancamentoComponent } from './new-lancamento.component';

describe('NewLancamentoComponent', () => {
  let component: NewLancamentoComponent;
  let fixture: ComponentFixture<NewLancamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLancamentoComponent]
    });
    fixture = TestBed.createComponent(NewLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovacaoContratoComponent } from './aprovacao-contrato.component';

describe('AprovacaoContratoComponent', () => {
  let component: AprovacaoContratoComponent;
  let fixture: ComponentFixture<AprovacaoContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprovacaoContratoComponent]
    });
    fixture = TestBed.createComponent(AprovacaoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

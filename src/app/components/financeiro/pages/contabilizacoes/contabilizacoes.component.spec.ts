import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilizacoesComponent } from './contabilizacoes.component';

describe('ContabilizacoesComponent', () => {
  let component: ContabilizacoesComponent;
  let fixture: ComponentFixture<ContabilizacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContabilizacoesComponent]
    });
    fixture = TestBed.createComponent(ContabilizacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

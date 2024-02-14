import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMoneycontratoComponent } from './grafico-moneycontrato.component';

describe('GraficoMoneycontratoComponent', () => {
  let component: GraficoMoneycontratoComponent;
  let fixture: ComponentFixture<GraficoMoneycontratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoMoneycontratoComponent]
    });
    fixture = TestBed.createComponent(GraficoMoneycontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

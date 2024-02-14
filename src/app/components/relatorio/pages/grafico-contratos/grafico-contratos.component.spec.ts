import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoContratosComponent } from './grafico-contratos.component';

describe('GraficoContratosComponent', () => {
  let component: GraficoContratosComponent;
  let fixture: ComponentFixture<GraficoContratosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoContratosComponent]
    });
    fixture = TestBed.createComponent(GraficoContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

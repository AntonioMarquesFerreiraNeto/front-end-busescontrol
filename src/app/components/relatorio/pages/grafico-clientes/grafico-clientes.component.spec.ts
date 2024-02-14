import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoClientesComponent } from './grafico-clientes.component';

describe('GraficoClientesComponent', () => {
  let component: GraficoClientesComponent;
  let fixture: ComponentFixture<GraficoClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoClientesComponent]
    });
    fixture = TestBed.createComponent(GraficoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

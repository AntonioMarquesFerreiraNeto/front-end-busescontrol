import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPercentualclienteComponent } from './grafico-percentualcliente.component';

describe('GraficoPercentualclienteComponent', () => {
  let component: GraficoPercentualclienteComponent;
  let fixture: ComponentFixture<GraficoPercentualclienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoPercentualclienteComponent]
    });
    fixture = TestBed.createComponent(GraficoPercentualclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

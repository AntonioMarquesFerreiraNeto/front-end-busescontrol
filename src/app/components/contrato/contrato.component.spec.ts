import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoComponent } from './contrato.component';

describe('ContratoComponent', () => {
  let component: ContratoComponent;
  let fixture: ComponentFixture<ContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratoComponent]
    });
    fixture = TestBed.createComponent(ContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirContratoComponent } from './gerir-contrato.component';

describe('GerirContratoComponent', () => {
  let component: GerirContratoComponent;
  let fixture: ComponentFixture<GerirContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirContratoComponent]
    });
    fixture = TestBed.createComponent(GerirContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

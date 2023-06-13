import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultClienteComponent } from './consult-cliente.component';

describe('ConsultClienteComponent', () => {
  let component: ConsultClienteComponent;
  let fixture: ComponentFixture<ConsultClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultClienteComponent]
    });
    fixture = TestBed.createComponent(ConsultClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

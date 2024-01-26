import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContratoComponent } from './new-contrato.component';

describe('NewContratoComponent', () => {
  let component: NewContratoComponent;
  let fixture: ComponentFixture<NewContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewContratoComponent]
    });
    fixture = TestBed.createComponent(NewContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

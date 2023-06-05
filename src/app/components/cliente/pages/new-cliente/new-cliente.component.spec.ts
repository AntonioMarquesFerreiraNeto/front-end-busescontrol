import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClienteComponent } from './new-cliente.component';

describe('NewClienteComponent', () => {
  let component: NewClienteComponent;
  let fixture: ComponentFixture<NewClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewClienteComponent]
    });
    fixture = TestBed.createComponent(NewClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

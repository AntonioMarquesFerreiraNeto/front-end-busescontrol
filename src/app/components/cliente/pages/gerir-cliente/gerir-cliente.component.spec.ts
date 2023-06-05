import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirClienteComponent } from './gerir-cliente.component';

describe('GerirClienteComponent', () => {
  let component: GerirClienteComponent;
  let fixture: ComponentFixture<GerirClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirClienteComponent]
    });
    fixture = TestBed.createComponent(GerirClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

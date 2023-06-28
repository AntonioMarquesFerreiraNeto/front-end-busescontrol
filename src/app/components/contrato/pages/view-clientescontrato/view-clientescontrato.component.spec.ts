import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientescontratoComponent } from './view-clientescontrato.component';

describe('ViewClientescontratoComponent', () => {
  let component: ViewClientescontratoComponent;
  let fixture: ComponentFixture<ViewClientescontratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientescontratoComponent]
    });
    fixture = TestBed.createComponent(ViewClientescontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

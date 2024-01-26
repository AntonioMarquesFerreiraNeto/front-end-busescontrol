import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfContratosComponent } from './pdf-contratos.component';

describe('PdfContratosComponent', () => {
  let component: PdfContratosComponent;
  let fixture: ComponentFixture<PdfContratosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfContratosComponent]
    });
    fixture = TestBed.createComponent(PdfContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

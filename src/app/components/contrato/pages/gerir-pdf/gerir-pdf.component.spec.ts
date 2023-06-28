import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirPdfComponent } from './gerir-pdf.component';

describe('GerirPdfComponent', () => {
  let component: GerirPdfComponent;
  let fixture: ComponentFixture<GerirPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirPdfComponent]
    });
    fixture = TestBed.createComponent(GerirPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

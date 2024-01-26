import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueceusenhaComponent } from './esqueceusenha.component';

describe('EsqueceusenhaComponent', () => {
  let component: EsqueceusenhaComponent;
  let fixture: ComponentFixture<EsqueceusenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsqueceusenhaComponent]
    });
    fixture = TestBed.createComponent(EsqueceusenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

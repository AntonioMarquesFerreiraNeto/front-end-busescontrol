import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirFinanceiroComponent } from './gerir-financeiro.component';

describe('GerirFinanceiroComponent', () => {
  let component: GerirFinanceiroComponent;
  let fixture: ComponentFixture<GerirFinanceiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirFinanceiroComponent]
    });
    fixture = TestBed.createComponent(GerirFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroAnalyticsComponent } from './financeiro-analytics.component';

describe('FinanceiroAnalyticsComponent', () => {
  let component: FinanceiroAnalyticsComponent;
  let fixture: ComponentFixture<FinanceiroAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceiroAnalyticsComponent]
    });
    fixture = TestBed.createComponent(FinanceiroAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

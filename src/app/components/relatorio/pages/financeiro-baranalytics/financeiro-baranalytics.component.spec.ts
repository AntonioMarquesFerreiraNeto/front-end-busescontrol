import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroBaranalyticsComponent } from './financeiro-baranalytics.component';

describe('FinanceiroBaranalyticsComponent', () => {
  let component: FinanceiroBaranalyticsComponent;
  let fixture: ComponentFixture<FinanceiroBaranalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceiroBaranalyticsComponent]
    });
    fixture = TestBed.createComponent(FinanceiroBaranalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

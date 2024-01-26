import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmrescisaoComponent } from './confirmrescisao.component';

describe('ConfirmrescisaoComponent', () => {
  let component: ConfirmrescisaoComponent;
  let fixture: ComponentFixture<ConfirmrescisaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmrescisaoComponent]
    });
    fixture = TestBed.createComponent(ConfirmrescisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

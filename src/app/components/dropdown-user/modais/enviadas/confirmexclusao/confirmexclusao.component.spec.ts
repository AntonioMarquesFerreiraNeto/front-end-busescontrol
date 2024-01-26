import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmexclusaoComponent } from './confirmexclusao.component';

describe('ConfirmexclusaoComponent', () => {
  let component: ConfirmexclusaoComponent;
  let fixture: ComponentFixture<ConfirmexclusaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmexclusaoComponent]
    });
    fixture = TestBed.createComponent(ConfirmexclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

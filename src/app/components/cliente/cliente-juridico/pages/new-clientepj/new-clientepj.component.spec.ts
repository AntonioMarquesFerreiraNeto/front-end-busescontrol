import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientepjComponent } from './new-clientepj.component';

describe('NewClientepjComponent', () => {
  let component: NewClientepjComponent;
  let fixture: ComponentFixture<NewClientepjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewClientepjComponent]
    });
    fixture = TestBed.createComponent(NewClientepjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

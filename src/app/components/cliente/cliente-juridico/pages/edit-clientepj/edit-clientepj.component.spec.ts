import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientepjComponent } from './edit-clientepj.component';

describe('EditClientepjComponent', () => {
  let component: EditClientepjComponent;
  let fixture: ComponentFixture<EditClientepjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditClientepjComponent]
    });
    fixture = TestBed.createComponent(EditClientepjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

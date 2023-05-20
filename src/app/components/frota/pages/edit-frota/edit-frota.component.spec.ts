import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFrotaComponent } from './edit-frota.component';

describe('EditFrotaComponent', () => {
  let component: EditFrotaComponent;
  let fixture: ComponentFixture<EditFrotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFrotaComponent]
    });
    fixture = TestBed.createComponent(EditFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFrotaComponent } from './new-frota.component';

describe('NewFrotaComponent', () => {
  let component: NewFrotaComponent;
  let fixture: ComponentFixture<NewFrotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFrotaComponent]
    });
    fixture = TestBed.createComponent(NewFrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

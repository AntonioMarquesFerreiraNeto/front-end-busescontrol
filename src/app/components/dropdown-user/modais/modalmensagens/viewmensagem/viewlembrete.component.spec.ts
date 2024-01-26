import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlembreteComponent } from './viewlembrete.component';

describe('ViewlembreteComponent', () => {
  let component: ViewlembreteComponent;
  let fixture: ComponentFixture<ViewlembreteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewlembreteComponent]
    });
    fixture = TestBed.createComponent(ViewlembreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

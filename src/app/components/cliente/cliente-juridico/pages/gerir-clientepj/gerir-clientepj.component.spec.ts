import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirClientepjComponent } from './gerir-clientepj.component';

describe('GerirClientepjComponent', () => {
  let component: GerirClientepjComponent;
  let fixture: ComponentFixture<GerirClientepjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirClientepjComponent]
    });
    fixture = TestBed.createComponent(GerirClientepjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

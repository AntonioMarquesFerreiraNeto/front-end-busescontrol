import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirStatusBusComponent } from './gerirstatus-bus.component';

describe('InativacaoBusComponent', () => {
  let component: GerirStatusBusComponent;
  let fixture: ComponentFixture<GerirStatusBusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirStatusBusComponent]
    });
    fixture = TestBed.createComponent(GerirStatusBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

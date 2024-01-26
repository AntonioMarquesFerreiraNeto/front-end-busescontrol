import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirdisponibilidadeComponent } from './gerirdisponibilidade.component';

describe('GerirdisponibilidadeComponent', () => {
  let component: GerirdisponibilidadeComponent;
  let fixture: ComponentFixture<GerirdisponibilidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirdisponibilidadeComponent]
    });
    fixture = TestBed.createComponent(GerirdisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

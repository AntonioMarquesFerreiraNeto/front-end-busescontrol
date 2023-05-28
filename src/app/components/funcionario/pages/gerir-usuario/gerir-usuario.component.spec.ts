import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirUsuarioComponent } from './gerir-usuario.component';

describe('GerirUsuarioComponent', () => {
  let component: GerirUsuarioComponent;
  let fixture: ComponentFixture<GerirUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirUsuarioComponent]
    });
    fixture = TestBed.createComponent(GerirUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

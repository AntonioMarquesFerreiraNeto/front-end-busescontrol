import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirFuncionarioComponent } from './gerir-funcionario.component';

describe('GerirFuncionarioComponent', () => {
  let component: GerirFuncionarioComponent;
  let fixture: ComponentFixture<GerirFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerirFuncionarioComponent]
    });
    fixture = TestBed.createComponent(GerirFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

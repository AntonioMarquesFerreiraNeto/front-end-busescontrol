import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFuncionarioComponent } from './new-funcionario.component';

describe('NewFuncionarioComponent', () => {
  let component: NewFuncionarioComponent;
  let fixture: ComponentFixture<NewFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFuncionarioComponent]
    });
    fixture = TestBed.createComponent(NewFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

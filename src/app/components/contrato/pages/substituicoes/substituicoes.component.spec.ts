import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstituicoesComponent } from './substituicoes.component';

describe('SubstituicoesComponent', () => {
  let component: SubstituicoesComponent;
  let fixture: ComponentFixture<SubstituicoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubstituicoesComponent]
    });
    fixture = TestBed.createComponent(SubstituicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

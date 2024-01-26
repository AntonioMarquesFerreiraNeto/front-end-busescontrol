import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGerircoresComponent } from './modal-gerircores.component';

describe('ModalGerircoresComponent', () => {
  let component: ModalGerircoresComponent;
  let fixture: ComponentFixture<ModalGerircoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGerircoresComponent]
    });
    fixture = TestBed.createComponent(ModalGerircoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

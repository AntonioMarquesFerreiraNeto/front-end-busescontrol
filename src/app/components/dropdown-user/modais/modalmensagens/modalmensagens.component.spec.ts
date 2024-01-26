import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmensagensComponent } from './modalmensagens.component';

describe('ModalmensagensComponent', () => {
  let component: ModalmensagensComponent;
  let fixture: ComponentFixture<ModalmensagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalmensagensComponent]
    });
    fixture = TestBed.createComponent(ModalmensagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

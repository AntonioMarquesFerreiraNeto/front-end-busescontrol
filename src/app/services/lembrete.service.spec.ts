import { TestBed } from '@angular/core/testing';

import { LembreteService } from './lembrete.service';

describe('LembreteService', () => {
  let service: LembreteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LembreteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OnibusService } from './onibus.service';

describe('OnibusService', () => {
  let service: OnibusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnibusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

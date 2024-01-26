import { TestBed } from '@angular/core/testing';

import { NoAuthGuard } from './no-auth-guard';

describe('NoAuthGuardService', () => {
  let service: NoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

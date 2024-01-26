import { TestBed } from '@angular/core/testing';

import { ClientePjService } from './cliente-pj.service';

describe('ClientePjService', () => {
  let service: ClientePjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientePjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

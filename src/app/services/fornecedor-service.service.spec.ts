import { TestBed } from '@angular/core/testing';

import { FornecedorServiceService } from './fornecedor-service.service';

describe('FornecedorServiceService', () => {
  let service: FornecedorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

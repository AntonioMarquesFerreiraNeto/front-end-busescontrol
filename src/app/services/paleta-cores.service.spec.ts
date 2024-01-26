import { TestBed } from '@angular/core/testing';

import { PaletaCoresService } from './paleta-cores.service';

describe('PaletaCoresService', () => {
  let service: PaletaCoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaletaCoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

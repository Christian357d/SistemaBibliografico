import { TestBed } from '@angular/core/testing';

import { CentrotrabajoService } from './centrotrabajo.service';

describe('CentrotrabajoService', () => {
  let service: CentrotrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentrotrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

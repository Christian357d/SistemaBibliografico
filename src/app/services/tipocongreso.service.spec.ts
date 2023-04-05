import { TestBed } from '@angular/core/testing';

import { TipocongresoService } from './tipocongreso.service';

describe('TipocongresoService', () => {
  let service: TipocongresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipocongresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

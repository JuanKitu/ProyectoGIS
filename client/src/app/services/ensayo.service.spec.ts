import { TestBed } from '@angular/core/testing';

import { EnsayoService } from './ensayo.service';

describe('EnsayoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnsayoService = TestBed.get(EnsayoService);
    expect(service).toBeTruthy();
  });
});

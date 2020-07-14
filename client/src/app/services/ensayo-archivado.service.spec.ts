import { TestBed } from '@angular/core/testing';

import { EnsayoArchivadoService } from './ensayo-archivado.service';

describe('EnsayoArchivadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnsayoArchivadoService = TestBed.get(EnsayoArchivadoService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PerfilGeradoService } from './perfil-gerado.service';

describe('PerfilGeradoService', () => {
  let service: PerfilGeradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilGeradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

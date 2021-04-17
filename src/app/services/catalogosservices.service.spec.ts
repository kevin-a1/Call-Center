import { TestBed } from '@angular/core/testing';

import { CatalogosservicesService } from './catalogosservices.service';

describe('CatalogosservicesService', () => {
  let service: CatalogosservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogosservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

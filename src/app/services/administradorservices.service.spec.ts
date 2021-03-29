import { TestBed } from '@angular/core/testing';

import { AdministradorservicesService } from './administradorservices.service';

describe('AdministradorservicesService', () => {
  let service: AdministradorservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradorservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

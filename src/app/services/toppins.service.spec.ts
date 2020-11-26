import { TestBed } from '@angular/core/testing';

import { ToppinsService } from './toppins.service';

describe('ToppinsService', () => {
  let service: ToppinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToppinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

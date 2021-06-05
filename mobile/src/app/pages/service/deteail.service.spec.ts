import { TestBed } from '@angular/core/testing';

import { DeteailService } from './deteail.service';

describe('DeteailService', () => {
  let service: DeteailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeteailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

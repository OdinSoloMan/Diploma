import { TestBed } from '@angular/core/testing';

import { UsersinfoService } from './usersinfo.service';

describe('UsersinfoService', () => {
  let service: UsersinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

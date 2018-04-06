import { TestBed, inject } from '@angular/core/testing';

import { UsersMockService } from './users-mock.service';

describe('UsersMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersMockService]
    });
  });

  it('should be created', inject([UsersMockService], (service: UsersMockService) => {
    expect(service).toBeTruthy();
  }));
});

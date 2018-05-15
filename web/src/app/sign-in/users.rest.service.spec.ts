import { TestBed, inject } from '@angular/core/testing';

import { UsersRestService } from './users.rest.service';

describe('TaskTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersRestService]
    });
  });

  it('should be created', inject([UsersRestService], (service: UsersRestService) => {
    expect(service).toBeTruthy();
  }));
});

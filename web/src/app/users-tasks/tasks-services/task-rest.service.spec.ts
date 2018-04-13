import { TestBed, inject } from '@angular/core/testing';

import { TaskRestService } from './task-rest.service';

describe('TaskRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskRestService]
    });
  });

  it('should be created', inject([TaskRestService], (service: TaskRestService) => {
    expect(service).toBeTruthy();
  }));
});

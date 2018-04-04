import { TestBed, inject } from '@angular/core/testing';

import { TaskTestService } from './task-test.service';

describe('TaskTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskTestService]
    });
  });

  it('should be created', inject([TaskTestService], (service: TaskTestService) => {
    expect(service).toBeTruthy();
  }));
});

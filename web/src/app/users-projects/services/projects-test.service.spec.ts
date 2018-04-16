import { TestBed, inject } from '@angular/core/testing';

import { ProjectsTestService } from './projects-test.service';

describe('ProjectsTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsTestService]
    });
  });

  it('should be created', inject([ProjectsTestService], (service: ProjectsTestService) => {
    expect(service).toBeTruthy();
  }));
});

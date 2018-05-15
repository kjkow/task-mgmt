import { TestBed, inject } from '@angular/core/testing';

import { ProjectsRestService } from './projects-rest.service';

describe('ProjectsRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsRestService]
    });
  });

  it('should be created', inject([ProjectsRestService], (service: ProjectsRestService) => {
    expect(service).toBeTruthy();
  }));
});

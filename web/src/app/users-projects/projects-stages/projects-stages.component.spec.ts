import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsStagesComponent } from './projects-stages.component';

describe('ProjectsStagesComponent', () => {
  let component: ProjectsStagesComponent;
  let fixture: ComponentFixture<ProjectsStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

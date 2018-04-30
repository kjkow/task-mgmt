import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Project {
  id?: number;
  name: string;
  finnished: boolean;
  description?: string;
  ordered: boolean;
}

@Injectable()
export abstract class ProjectsService {

  abstract getProjectsStream(): Observable<Array<Project>>;

  abstract saveProject(project: Project);

  abstract updateProjects();

}

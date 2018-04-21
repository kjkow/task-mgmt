import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../users-tasks/tasks-services/task.service';

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

}

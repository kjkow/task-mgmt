import { Injectable } from '@angular/core';
import { Task } from '../users-tasks/tasks-services/task.service';
import { Observable } from 'rxjs';

export interface Project {
  id?: number;
  name: string;
  finnished: boolean;
  description?: string;
  ordered: boolean;
}

export interface ProjectStage extends Task {
  projectId: number;
  finnished: boolean;
  ordinalNumber?: number;  
}

@Injectable()
export abstract class ProjectsService {

  abstract getProjectsStream(): Observable<Array<Project>>;

  abstract saveProject(project: Project);

}

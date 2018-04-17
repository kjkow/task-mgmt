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

export interface ProjectStage extends Task {
  projectId: number;
  finnished: boolean;
  ordinalNumber?: number;  
}

@Injectable()
export abstract class ProjectsService {

  abstract getProjectsStream(): Observable<Array<Project>>;

  abstract getProjectsTasksStream(): Observable<Array<ProjectStage>>;

  abstract updateProjectTasks(projectId: number);

  abstract saveProject(project: Project);

  abstract saveProjectStage(projectStage: ProjectStage);

}

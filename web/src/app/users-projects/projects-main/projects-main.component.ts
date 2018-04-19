import { Component, OnInit } from '@angular/core';
import { Project } from '../services/projects.service';
import { ProjectFormMode } from '../project-form/project-form-mode';
import { TaskService } from '../../users-tasks/tasks-services/task.service';

@Component({
  selector: 'projects-main',
  template: `
  <project-form [project]="project" [mode]="mode" (onSave)="saveProject($event)"></project-form>
  
  <div class="row">
    <projects-list (clicked)="onProjectPick($event)" class="col-sm"></projects-list>
    <projects-stages *ngIf="project" class="col-sm"></projects-stages>
  </div>
  `,
  styles: []
})
export class ProjectsMainComponent implements OnInit {

  project: Project;
  mode: ProjectFormMode;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onProjectPick(project: Project){
    this.taskService.updateProjectsTasks(project.id);
    this.project = project;
    this.mode = ProjectFormMode.MODIFY;
  }

  saveProject(mode: ProjectFormMode){
    this.mode = mode;
  }

}

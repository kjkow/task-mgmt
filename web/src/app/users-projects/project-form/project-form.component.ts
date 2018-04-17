import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project, ProjectsService } from '../services/projects.service';
import { ProjectFormMode } from './project-form-mode';

@Component({
  selector: 'project-form',
  template: `
    <form id="task-form" *ngIf="mode == 'new' || mode =='modify'">

      <!--Project name-->
      <div class="form-group row">
        <label for="projectName" class="col-sm-3 col-form-label">Nazwa</label>
        <div class="col-sm-9">
          <input type="text" [(ngModel)]="project.name" 
                 class="form-control" id="projectName" 
                 placeholder="Wprowadź nazwę porojektu"
                 name="name">
        </div>
      </div>

      <!--Project description-->
      <div class="form-group">
        <label for="projectDescription">Opis projektu</label>
        <textarea class="form-control" 
                  id="projectDescription" rows="5"
                  name="description" [(ngModel)]="project.description">
        </textarea>
      </div>

      <!--Projects tasks ordered-->
      <div class="form-group form-check" *ngIf="mode == 'new'">
        <label class="form-check-label">
        <input type="checkbox" 
               class="form-check-input"
               name="ordered" [(ngModel)]="project.ordered">
        Zadania uporządkowane</label>
      </div>

      <div class="form-group">
        <!--Submit-->
        <button type="button" form="task-form" class="btn btn-success" (click)="save()">Zapisz</button>

        <!--Close project-->
        <button type="button" 
                class="btn btn-success float-right"
                *ngIf="mode == 'modify'">
        Zakończ projekt</button>
      </div> 
    </form>
    
    <button class="btn" *ngIf="mode == 'empty'" (click)="newProject()">Stwórz nowy projekt</button>
  `,
  styles: []
})
export class ProjectFormComponent implements OnInit {

  @Input() project: Project;
  @Input() mode: ProjectFormMode;
  @Output() onSave = new EventEmitter();

  newProject(){
    this.mode = ProjectFormMode.NEW;
  }

  save(){
    let copy = this.copyProject;
    this.projectService.saveProject(copy);
    this.onSave.emit(ProjectFormMode.EMPTY);
  }

  get copyProject(): Project {
    let copy: Project = {
      name: this.project.name,
      ordered: this.project.ordered,
      finnished: this.project.finnished
    }
    Object.assign(copy, this.project);
    return copy;
  }

  constructor(private projectService: ProjectsService) { }

  ngOnInit() {
    //mock
    this.mode = ProjectFormMode.EMPTY;
    this.project = {
      name: "Testowy mock projekt",
      ordered: true,
      finnished: false
    }
  }

}

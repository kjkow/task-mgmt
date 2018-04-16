import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'projects-list',
  template: `
    <h5>Twoje projekty</h5>
    <div 
      (click)="onClick(project)"
      class="card"
      *ngFor="let project of projects | async">
      {{project.name}}
    </div>
  `,
  styles: [`
    div {
     cursor: pointer;  
    }
  `]
})
export class ProjectsListComponent implements OnInit {
  
  @Output() clicked = new EventEmitter();
  projects;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projectsService.getProjectsStream();
  }

  onClick(project){
    this.clicked.emit(project);
  }

}

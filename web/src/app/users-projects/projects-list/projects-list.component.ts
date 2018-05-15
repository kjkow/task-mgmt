import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'projects-list',
  template: `
    <h5>Twoje projekty</h5>
    <input [(ngModel)]="showFinnishedProjects" id="showFinnishedProjectsCheckbox" (change)="finnishedProjectsChanged()" type="checkbox">
    <label for="showFinnishedProjectsCheckbox">Pokaż tylko ukończone projekty</label>
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
  showFinnishedProjects: boolean;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.showFinnishedProjects = false;
    this.projects = this.projectsService.getProjectsStream()
      .map( 
        projects => projects.filter(
         project => project.finnished == this.showFinnishedProjects
      ))
  }

  onClick(project){
    this.clicked.emit(project);
  }

  finnishedProjectsChanged(){
    this.projectsService.updateProjects();
  }

}

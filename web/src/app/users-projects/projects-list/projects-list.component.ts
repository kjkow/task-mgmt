import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'projects-list',
  template: `
    <h5>Twoje projekty</h5>
    <div 
      class="card"
      *ngFor="let project of projects | async">
      {{project.name}}
    </div>
  `,
  styles: []
})
export class ProjectsListComponent implements OnInit {

  projects;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projectsService.getProjectsStream();
  }

}

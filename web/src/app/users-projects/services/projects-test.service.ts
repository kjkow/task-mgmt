import { Injectable } from '@angular/core';
import { ProjectsService, Project } from './projects.service';
import { Observable, Subject } from 'rxjs';
import { Obszar } from '../../users-tasks/tasks-services/obszar.enum';

@Injectable()
export class ProjectsTestService implements ProjectsService {

  projectsStream = new Subject<Project[]>();
  projectId: number = 1;

  projects: Project[] = [
    {id: this.projectId++, name: "Projekt 1", finnished: false, ordered: false},
    {id: this.projectId++, name: "Projekt 2", finnished: false, ordered: true},
    {id: this.projectId++, name: "Projekt 3", finnished: false, ordered: false, description: "Projekt trzeci"},
    {id: this.projectId++, name: "Projekt 4", finnished: true, ordered: false},
  ];

  getProjectsStream(): Observable<Project[]> {
    return Observable.from(this.projectsStream).startWith(this.projects);
  }

  saveProject(project: Project) {
    if(project.id != null) this.modify(project);
    else{
      project.id = this.projectId++;
      this.projects.push(project);
      this.updateProjects();
    }
  }

  modify(project: Project){
    let localProject = this.projects.find(p => p.id == project.id);
    let index = this.projects.indexOf(localProject);

    this.projects[index] = project;
    this.updateProjects();
  }

  updateProjects(){
    this.projectsStream.next(this.projects);  
  }

  constructor() {
    this.updateProjects();
   }

}

import { Injectable } from '@angular/core';
import { ProjectsService, Project } from './projects.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProjectsTestService implements ProjectsService {

  projectsStream = new Subject<Project[]>();

  projects: Project[] = [
    {id: 1, name: "Projekt 1", finnished: false, ordered: false},
    {id: 2, name: "Projekt 2", finnished: false, ordered: true},
    {id: 3, name: "Projekt 3", finnished: false, ordered: false, description: "Projekt trzeci"}
  ];

  getProjectsStream(): Observable<Project[]> {
    return Observable.from(this.projectsStream);
  }

  saveProject(project: Project) {
    if(project.id != null) this.modify(project);
    else{
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

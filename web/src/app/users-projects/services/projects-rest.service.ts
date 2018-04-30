import { Injectable } from '@angular/core';
import { ProjectsService, Project } from './projects.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app-main/app-settings';

@Injectable()
export class ProjectsRestService implements ProjectsService {

  projectStream = new Subject<Project[]>();
  projects: Project[] = [];

  getProjectsStream(): Observable<Project[]> {
    return Observable.from(this.projectStream).startWith(this.projects);
  }

  saveProject(project: Project) {
    let body = this.prepareBody(project);
    if(project.id != null) this.modify(project.id, body);
    else this.save(project, body);
  }

  modify(id: number, body){
    this.http.post<Project>(AppSettings.API_ENDPOINT + "projects/update/" + id, body)
    .subscribe(response =>{
      this.updateProjects();
    })
  }

  save(project: Project, body){
    this.http.post<Project>(AppSettings.API_ENDPOINT + "projects/add", body)
    .subscribe(response => {
      this.updateProjects();
    })
  }

  updateProjects() {
    this.http.get<Array<Project>>(AppSettings.API_ENDPOINT + "projects/")
    .subscribe((response) =>{
      this.projects = response;
      this.projectStream.next(this.projects);
    })
  }

  prepareBody(project: Project){
    return {
      "id": project.id,
      "name": project.name,
      "finnished": project.finnished,
      "description": project.description,
      "ordered": project.ordered
    }
  }

  constructor(private http:HttpClient) {
    this.updateProjects();
   }

}

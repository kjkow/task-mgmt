import { Injectable } from '@angular/core';
import { ProjectsService, Project, ProjectStage } from './projects.service';
import { Observable, Subject } from 'rxjs';
import { Obszar } from '../../users-tasks/tasks-services/obszar.enum';

@Injectable()
export class ProjectsTestService implements ProjectsService {

  projectsStream = new Subject<Project[]>();
  projectsStagesStream = new Subject<ProjectStage[]>();

  projects: Project[] = [
    {id: 1, name: "Projekt 1", finnished: false, ordered: false},
    {id: 2, name: "Projekt 2", finnished: false, ordered: true},
    {id: 3, name: "Projekt 3", finnished: false, ordered: false, description: "Projekt trzeci"}
  ];

  projectsStages: ProjectStage[] = [
    {name: "Zadanie projektu 1", id: 7, area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI, finnished: false, projectId: 1, userId: 123}
  ]

  getProjectsStream(): Observable<Project[]> {
    return Observable.from(this.projectsStream).startWith(this.projects);
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

  updateProjectsStages(){
    this.projectsStagesStream.next(this.projectsStages);
  }

  getProjectsTasksStream(): Observable<ProjectStage[]> {
    return Observable.from(this.projectsStagesStream).startWith(this.projectsStages);
  }

  saveProjectStage(projectStage: ProjectStage) {
    if(projectStage.id != null) this.modifyStage(projectStage);
    else{
      this.projectsStages.push(projectStage);
      this.updateProjectsStages();
    }
  }

  modifyStage(projectStage){
    let stage = this.projectsStages.find(s => s.id == projectStage.id);
    let index = this.projectsStages.indexOf(stage);

    this.projectsStages[index] = projectStage;
    this.updateProjectsStages();
  }

  constructor() {
    this.updateProjects();
   }

}

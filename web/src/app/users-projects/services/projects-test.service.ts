import { Injectable } from '@angular/core';
import { ProjectsService, Project, ProjectStage } from './projects.service';
import { Observable, Subject } from 'rxjs';
import { Obszar } from '../../users-tasks/tasks-services/obszar.enum';

@Injectable()
export class ProjectsTestService implements ProjectsService {

  projectsStream = new Subject<Project[]>();
  projectsStagesStream = new Subject<ProjectStage[]>();
  projectId: number = 1;

  projects: Project[] = [
    {id: this.projectId++, name: "Projekt 1", finnished: false, ordered: false},
    {id: this.projectId++, name: "Projekt 2", finnished: false, ordered: true},
    {id: this.projectId++, name: "Projekt 3", finnished: false, ordered: false, description: "Projekt trzeci"}
  ];

  projectsStages: ProjectStage[] = [
    {name: "Pierwsze zadanie projektu 1", id: 7, area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI, finnished: false, projectId: 1, userId: 123},
    {name: "Drugie zadanie projektu 1", id: 8, area: Obszar.OBOWIAZKI, finnished: false, projectId: 1, userId: 123},
    {name: "Pierwsze zadanie projektu 2", id: 9, area: Obszar.W_PIERWSZEJ_CHWILI, finnished: false, projectId: 2, userId: 123}
  ]

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

  updateProjectsStages(){
    this.projectsStagesStream.next(this.projectsStages);
  }

  getProjectsTasksStream(): Observable<ProjectStage[]> {
    return Observable.from(this.projectsStagesStream);
  }

  updateProjectTasks(projectId: number){
    let local: ProjectStage[] = new Array<ProjectStage>();
    this.projectsStages.forEach( task => {
      if(task.projectId == projectId){
        local.push(task);
      }
    })
    this.projectsStagesStream.next(local);
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

  finnishProject(project: Project){
    let localProject = this.projects.find(p => p.id == project.id);
    let index = this.projects.indexOf(localProject);

    if(index > 0) console.log(this.projects.splice(index, 1));
    this.updateProjects();
  }

  constructor() {
    this.updateProjects();
   }

}

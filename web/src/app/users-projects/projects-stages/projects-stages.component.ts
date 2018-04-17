import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../users-tasks/tasks-services/task.service';
import { Obszar } from '../../users-tasks/tasks-services/obszar.enum';
import { ProjectStage } from '../services/projects.service';

@Component({
  selector: 'projects-stages',
  template: `
    <h5>Etapy projektu</h5>
    <div 
         class="card"
         *ngFor="let task of projectsTasks | async">
         {{task.name}}
    </div>

    <div class="card">Zadanie projektu 1</div>
  `,
  styles: [`
    div {
      cursor: pointer;  
    }
  `]
})
export class ProjectsStagesComponent implements OnInit {

  projectsTasks;

  constructor(private taskService: TaskService) { }

  ngOnInit() {

  }

}

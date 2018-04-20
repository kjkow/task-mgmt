import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../users-tasks/tasks-services/task.service';
import { Obszar } from '../../users-tasks/tasks-services/obszar.enum';

@Component({
  selector: 'projects-stages',
  template: `
    <h5>Etapy projektu</h5>
    <div (click)="clicked(task)"
         class="card"
         *ngFor="let task of projectsTasks | async">
         {{task.name}}
    </div>
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

  clicked(task){
    console.log(task)
  }

  ngOnInit() {
    this.projectsTasks = this.taskService.getTasksStream();
  }

}

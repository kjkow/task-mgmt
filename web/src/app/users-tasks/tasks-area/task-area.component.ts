import { Component, OnInit, Input } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task, TaskService } from '../tasks-services/task.service';

@Component({
  selector: 'task-area',
  template: `
  <h5>{{obszar}}</h5>
  <div class="row">

    <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">+</h6>
        </div>
      </div>
    </div>

    <user-task 
      class="col-sm-4" 
      *ngFor="let task of tasksInArea | async"
      [task]="task">
    </user-task>

  </div>
  `,
  styles: []
})
export class TaskAreaComponent implements OnInit {

  @Input() obszar: Obszar;

  tasksInArea;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasksInArea = this.taskService.getTasksStream(this.obszar);  
  }

}

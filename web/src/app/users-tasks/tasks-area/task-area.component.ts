import { Component, OnInit, Input } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task, TaskService } from '../tasks-services/task.service';

@Component({
  selector: 'task-area',
  template: `
  <h5>{{obszar}}</h5>
  <div class="row">

    <user-task 
      class="col-sm-4" 
      *ngFor="let _task of tasksInArea"
      [task]="_task">
    </user-task>

    <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">+</h6>
        </div>
      </div>
    </div>
    
  </div>
  `,
  styles: []
})
export class TaskAreaComponent implements OnInit {

  @Input() obszar: Obszar;

  tasksInArea: Task[];
  

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasksInArea = this.taskService.getUsersTasksForArea(123, this.obszar);
  }//TODO: id uzytkownika

}

import { Component, OnInit, Input } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task, TaskService } from '../tasks-services/task.service';

@Component({
  selector: 'task-area',
  template: `
  <h5>{{obszar}}</h5>
  <div class="row">
    
    <div *ngIf="tmpTask" class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">{{tmpTask.nazwa}}</h6>
        </div>
      </div>
    </div>

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
  tmpTask: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasksInArea = this.taskService.getUsersTasksForArea(123, this.obszar);
    if(this.tasksInArea.length > 0){
      this.tmpTask = this.tasksInArea[0];
    }
    console.log(this.tasksInArea);
  }

}

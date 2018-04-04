import { Component, OnInit, Input } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task, TaskService } from '../tasks-services/task.service';

@Component({
  selector: 'task-area',
  template: `
  <div class="card-block">
    <div class="card-title">{{obszar}}</div>
    
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
    console.log(this.tasksInArea);
  }

}

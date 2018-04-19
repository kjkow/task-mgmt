import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task, TaskService } from '../tasks-services/task.service';

@Component({
  selector: 'task-area',
  template: `
  <h5>{{obszar}}</h5>
  <div class="row">

    <div class="col-sm-4 mouse-pointer" (click)="onSelecetedAdd()">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">+</h6>
        </div>
      </div>
    </div>

    <user-task 
      class="col-sm-4 mouse-pointer" 
      *ngFor="let task of tasksInArea | async"
      (onSelectedOut)="onSelecetedModify($event)"
      [task]="task">
    </user-task>

  </div>
  `,
  styles: [`
  .mouse-pointer{
    cursor: pointer;
  }
  `]
})
export class TaskAreaComponent implements OnInit {

  @Input() obszar: Obszar;
  @Output() selected = new EventEmitter();

  tasksInArea;

  constructor(private taskService: TaskService) {}

  onSelecetedAdd(){
    this.selected.emit({
      selected: true,  
      task: {
        name: "Nowe zadanie",
        area: Obszar.W_PIERWSZEJ_CHWILI,
        idUzytkownika: 123
      }});
  }

  onSelecetedModify(task){
    this.selected.emit({selected: true, task: task});
  }

  ngOnInit() {
    this.tasksInArea = this.taskService.getTasksStream()
      .map(
        tasks => tasks.filter(
          task => task.area == this.obszar
        )
      );
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task, TaskService } from '../tasks-services/task.service';
import { TaskSelection } from '../tasks-main/tasks-main.component';
import { UserService } from '../../sign-in/service/user.service';

@Component({
  selector: 'task-area',
  template: `
  <h5>{{obszar}}</h5>
  <div class="row" droppable (onDrop)="onItemDrop($event)">

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
  .row{
    height: 100%;
  }

  `]
})
export class TaskAreaComponent implements OnInit {

  @Input() obszar: Obszar;
  @Output() selected = new EventEmitter();

  onItemDrop(event){
    let task: Task = event.dragData;
    task.area = this.obszar;
    this.taskService.save(task);
  }

  tasksInArea;

  constructor(private taskService: TaskService, private userService: UserService) {}

  onSelecetedAdd(){
    let userId = this.userService.userInfo.user.userId;
    
    if(!userId) return;
    let taskSelection: TaskSelection = {
      selected: true,
      task: {
        name: "",
        area: this.obszar,
        userId: userId 
      }
    }
    this.selected.emit(taskSelection);
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

import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task } from '../tasks-services/task.service';


@Component({
  selector: 'tasks-main',
  template: `

  <task-navigation (selection)="navSelected($event)"></task-navigation>

  <div class="row">
  
  <div [ngSwitch]="taskArea" class="col-8">
    <task-areas *ngSwitchCase="'current'" (selected)="selection($event)"></task-areas>
    <task-area  *ngSwitchCase="'reference'"></task-area>
    <task-area  *ngSwitchCase="'finnished'"></task-area>
  </div>
  
  <task-form 
    [task]="task" 
    class="onetask col-4"
    *ngIf="selected">
  </task-form>
  
  </div>
  `,
  styles: [`
  cl{
    clear: left;
  }
  .onetask{
    width:25%;
    float:left;
    height: 100%;
  }
  `]
})
export class UsersTasksComponent implements OnInit {

  task: Task;
  selected = false;

  taskAreasTitle = "Bieżące zadania";
  referencesTitle = Obszar.MATERIALY_REFERENCYJNE;
  finnishedTitle = Obszar.UKONCZONE;
  taskArea = "current";

  constructor() { }

  selection(selection){
    this.task = selection.task;
    this.selected = selection.selected;
  }

  navSelected(selection){
    this.taskArea = selection;
  }

  ngOnInit() {
  }

}

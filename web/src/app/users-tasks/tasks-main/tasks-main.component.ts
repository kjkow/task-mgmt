import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task } from '../tasks-services/task.service';


@Component({
  selector: 'tasks-main',
  template: `

  <task-navigation></task-navigation>

  <h4>{{taskAreasTitle}}</h4>
  <div class="row">
  <task-areas (selected)="selection($event)" class="col-8"></task-areas>
  
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

  constructor() { }

  selection(selection){
    this.task = selection.task;
    this.selected = selection.selected;
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task } from '../tasks-services/task.service';


@Component({
  selector: 'tasks-main',
  template: `
  <h4>{{taskAreasTitle}}</h4>
  <div class="row">
  <task-areas (selected)="selection($event)" class="col-8"></task-areas>
  
  <task-form 
    [task]="task" 
    class="onetask col-4"
    *ngIf="selected">
  </task-form>
  
  </div>

  <div class="cl">
    <h4>{{referencesTitle}}</h4>
    todo...
  </div>
  
  <div class="cl">
    <h4>{{finnishedTitle}}</h4>
    todo...
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
    min-height: 36em;
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
    this.selected = selection.selected;
  }

  ngOnInit() {
  }

}

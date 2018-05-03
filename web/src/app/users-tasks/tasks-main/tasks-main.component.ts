import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';
import { Task } from '../tasks-services/task.service';

export interface TaskSelection {
  selected: boolean,
  task: Task
}

@Component({
  selector: 'tasks-main',
  template: `

  <task-navigation (selection)="navSelected($event)"></task-navigation>

  <div class="row top-space">
  
  <div [ngSwitch]="taskArea" class="col-8">
    <task-areas *ngSwitchCase="'current'" (selected)="selection($event)"></task-areas>
    <task-area (selected)="selection($event)"  *ngSwitchCase="'reference'" [obszar]="selectedArea"></task-area>
    <task-area (selected)="selection($event)"  *ngSwitchCase="'finnished'" [obszar]="selectedArea"></task-area>
    <projects-main (selectedStage)="selection($event)" *ngSwitchCase="'projects'"></projects-main>
    <user-settings register="false" buttonMessage="Zapisz" title="Ustawienia konta" (selectedStage)="selection($event)" *ngSwitchCase="'settings'"></user-settings>
    <app-sign-in *ngSwitchCase="'welcome'"></app-sign-in>
  </div>
  
  <task-form 
    [task]="task" 
    class="onetask col-4"
    (onSave)="selection($event)"
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
  .top-space{
    margin-top: 1em;
  }
  `]
})
export class UsersTasksComponent implements OnInit {

  task: Task;
  selected = false;

  taskAreasTitle = "Bieżące zadania";
  referencesTitle = Obszar.MATERIALY_REFERENCYJNE;
  finnishedTitle = Obszar.UKONCZONE;
  taskArea = "welcome";

  constructor() { }

  selection(selection: TaskSelection){
    this.task = selection.task;
    this.selected = selection.selected;
  }

  navSelected(selection){
    this.taskArea = selection;
  }

  get selectedArea(): Obszar{
    if(this.taskArea == "reference") return Obszar.MATERIALY_REFERENCYJNE;
    else if(this.taskArea == "finnished") return Obszar.UKONCZONE;
  }

  ngOnInit() {
  }

}

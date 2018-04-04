import { Component, OnInit } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';

@Component({
  selector: 'task-areas',
  template: `
  <div class="contents">
    <task-area 
      class="col-md-6 quarter card"  
      *ngFor="let o of viewedTaskAreas"
      [obszar]="o">
    </task-area>
  </div>
  `,
  styles: [`
  .quarter{
    width:50%;
    height:100%;
    float:left;
    min-height: 18em;
  }
  .contents{
    height:50%;
    width:100%;
  }
  `]
})
export class TaskAreasComponent implements OnInit {

  viewedTaskAreas = [
    Obszar.W_PIERWSZEJ_CHWILI,
    Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
    Obszar.OBOWIAZKI,
    Obszar.MOZE_KIEDYS
  ]

  constructor() { }

  ngOnInit() {
  }

}

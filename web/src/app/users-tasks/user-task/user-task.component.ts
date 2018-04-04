import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../tasks-services/task.service';
import { Obszar } from '../tasks-services/obszar.enum';

@Component({
  selector: 'user-task',
  template: `
    <div class="card">
      <div class="card-body">
        <h6 class="card-title">{{task.nazwa}}</h6>
        <p *ngIf="task.termin" class="card-text">{{task.termin | date:'yyyy-MM-dd'}}</p>
      </div>
    </div>
  `,
  styles: []
})
export class UserTaskComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

}

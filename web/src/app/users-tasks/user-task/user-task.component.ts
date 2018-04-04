import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../tasks-services/task.service';
import { Obszar } from '../tasks-services/obszar.enum';

@Component({
  selector: 'user-task',
  template: `
    <div class="card">
      <div class="card-body userTask">
        <span class="card-title hideOverflow">{{task.nazwa}}</span>
        <p *ngIf="task.termin" class="card-text">{{task.termin | date:'yyyy-MM-dd'}}</p>
      </div>
    </div>
  `,
  styles: [`
    .userTask{
      height: 5em;
      font-size: 0,5em;
      padding: 5px;
    }
    .hideOverflow{
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      width:100%;
      display:block;
    }
  `]
})
export class UserTaskComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

}

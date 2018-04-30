import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../tasks-services/task.service';
import { Obszar } from '../tasks-services/obszar.enum';

@Component({
  selector: 'user-task',
  template: `
    <div class="card" (click)="onSelected()" draggable [dragData]="task">
      <div class="card-body userTask">
        <span class="card-title hideOverflow">{{task.name}}</span>
        <p *ngIf="task.termin" class="card-text">{{task.termin | date:'yyyy-MM-dd'}}</p>
      </div>
    </div>
  `,
  styles: [`
    .userTask{
      height: auto;
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
  @Output() onSelectedOut = new EventEmitter();

  constructor() { }

  onSelected(){
    this.onSelectedOut.emit(this.task);
  }

  ngOnInit() {
  }

}

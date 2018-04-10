import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../tasks-services/task.service';
import { Obszar } from '../tasks-services/obszar.enum';

@Component({
  selector: 'task-form',
  template: `
    <div class="card">
      <div class="form-group">
      <label>Nazwa:</label>
      <input type="text" [(ngModel)]="task.nazwa" class="form-control">
    </div>
    </div>
  `,
  styles: [`
  .card {
    min-height: 36em;
    padding: 10px;
  }
  `]
})
export class TaskFormComponent implements OnInit {

  @Input()
  task: Task;

  constructor() { }

  ngOnInit() {
    this.task = {
      nazwa: "Bieżące zadanie",
      idUzytkownika: 123,
      obszar: Obszar.MATERIALY_REFERENCYJNE
    }
    
  }

}

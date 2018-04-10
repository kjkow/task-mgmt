import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
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

      <div class="form-group">
        <label>Komentarz:</label>
        <input type="text" [(ngModel)]="task.komentarz" class="form-control">
      </div>

      <div class="form-group">
        <label>Obszar:</label>
        <select [(ngModel)]="task.obszar" class="form-control" name="area">
          <option *ngFor="let item of areas | allAreas" [value]="item.key">{{item.key}}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Priorytet:</label>
        <input type="number" [(ngModel)]="task.priorytet" class="form-control">
      </div>

      <div class="form-group">
        <label>Termin:</label>
        <input type="date" [(ngModel)]="task.termin" class="form-control">
      </div>

      <div class="form-group">
        <label>Sekcja:</label>
        <input type="text" [(ngModel)]="task.sekcja" class="form-control">
      </div>

      <div class="form-group">
        <label>Częstotliwość:</label>
        <input type="number" [(ngModel)]="task.czestotliwoscPowtarzalnosci" class="form-control">
      </div>

      <div class="form-group">
        <label>Typ częstotliwości:</label>
        <input type="text" [(ngModel)]="task.typCzestotliwosci" class="form-control">
      </div>
    </div>
    
  `,//TODO: etykiety, stylowanie, submit button
  styles: [`
  .card {
    min-height: 36em;
    padding: 10px;
  }
  `]
})
export class TaskFormComponent implements OnInit {
  
  areas = Obszar;

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


@Pipe({
  name: 'allAreas'
})
export class AreasPipe implements PipeTransform {  
  transform(value, args:string[]) : any {
    let keys = [];
    for (var enumMember in value) {
      keys.push({key: enumMember, value: value[enumMember]});
    }
    return keys;
  }

}

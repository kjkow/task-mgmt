import { Component, OnInit, Input, PipeTransform, Pipe, Output, EventEmitter } from '@angular/core';
import { Task, TaskService } from '../tasks-services/task.service';
import { Obszar } from '../tasks-services/obszar.enum';

@Component({
  selector: 'task-form',
  template: `
    <div class="card">
      <h5 class="card-title">Wybrane zadanie</h5>

      <div class="form-group">
        <label>Nazwa:</label>
        <input type="text" [(ngModel)]="task.name" class="form-control">
      </div>

      <div class="form-group">
        <label>Komentarz:</label>
        <input type="text" [(ngModel)]="task.comment" class="form-control">
      </div>

      <div class="form-group">
        <label>Obszar:</label>
        <select [(ngModel)]="task.area" class="form-control" name="area">
          <option *ngFor="let item of areas | allAreas" [value]="item.value">{{item.value}}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Priorytet:</label>
        <input type="number" [(ngModel)]="task.priority" class="form-control">
      </div>

      <div class="form-group">
        <label>Termin:</label>
        <input type="date" [(ngModel)]="task.dueDate" class="form-control">
      </div>

      <div class="form-group">
        <label>Sekcja:</label>
        <input type="text" [(ngModel)]="task.section" class="form-control">
      </div>

      <div class="form-group">
        <label>Częstotliwość:</label>
        <input type="number" [(ngModel)]="task.recurrenceFrequency" class="form-control">
      </div>

      <div class="form-group">
        <label>Typ częstotliwości:</label>
        <input type="text" [(ngModel)]="task.frequencyType" class="form-control">
      </div>
      
      <div class="form-group">
        <button class="btn btn-success float-right" (click)="save()">Zapisz</button>
        <button class="btn btn-success float-left" (click)="finnish()">Wykonaj</button>
      </div>

    </div>
    
  `,//TODO: etykiety, stylowanie, submit button
  styles: [`
  .card {
    padding: 10px;
  }
  `]
})
export class TaskFormComponent implements OnInit {
  
  areas = Obszar;
  
  @Input() task: Task;
  @Output() onSave = new EventEmitter();

  save(){
    let copy = this.copyTask;
    this.saveAndEmit(copy);
  }

  finnish(){
    let copy = this.copyTask;
    copy.area = Obszar.UKONCZONE;
    if(copy.finnishedProjectStage == false) copy.finnishedProjectStage = true;
    this.saveAndEmit(copy);
  }

  get copyTask(): Task{
    let copy: Task = {
      name: this.task.name,
      area: this.task.area,
      userId: this.task.userId 
    }
    Object.assign(copy, this.task);
    return copy;
  }

  saveAndEmit(taskCopy){
    this.taskService.save(taskCopy);
    this.onSave.emit({task: undefined, selected: false});
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {}

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

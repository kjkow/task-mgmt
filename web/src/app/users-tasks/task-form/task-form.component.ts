import { Component, OnInit, Input, PipeTransform, Pipe, Output, EventEmitter } from '@angular/core';
import { Task, TaskService } from '../tasks-services/task.service';
import { Obszar } from '../tasks-services/obszar.enum';
import { ProjectsService } from '../../users-projects/services/projects.service';

@Component({
  selector: 'task-form',
  template: `
    <div class="card">
      <h5 class="card-title">Wybrane zadanie</h5>

      <!-- Task name -->
      <div class="form-group">
        <label for="taskName">Nazwa:</label>
        <input id="taskName" type="text" 
               [(ngModel)]="task.name" 
               class="form-control" 
               name="name"
               placeholder="Wprowadź nazwę zadania">
      </div>

      <!-- Task comment -->
      <div class="form-group">
        <label for="taskComment">Komentarz:</label>
        <textarea id="taskComment" 
                  rows="2" 
                  name="comment" 
                  [(ngModel)]="task.comment" 
                  class="form-control"
                  maxlength="300"
                  placeholder="Opisz zadanie...">
        </textarea>
      </div>

      <!-- Task area -->
      <div class="form-group row">
        <label for="projectArea" class="col-sm-3 col-form-label">Obszar:</label>
        <div class="col-sm-9">
          <select id="projectArea" [(ngModel)]="task.area" class="form-control" name="area">
            <option *ngFor="let item of areas | allAreas" [value]="item.value">{{item.value}}</option>
          </select>
        </div>
      </div>

      <!-- Task due date -->
      <div class="form-group">
        <label for="taskDueDate">Termin:</label>
        <input id="taskDueDate" type="date" 
               [(ngModel)]="task.dueDate" 
               class="form-control">
      </div>

      <div class="form-row">
        <!-- Task priority -->
        <div class="form-group col-sm-3">
            <label for="taskPriority">Priorytet:</label>
            <select id="taskPriority" [(ngModel)]="task.priority" class="form-control" name="priority">
              <option *ngFor="let number of [1,2,3]" [value]="number">{{number}}</option>
            </select>          
        </div>

        <!-- Task section -->
        <div class="form-group col-sm-9">
          <label for="taskSection">Sekcja:</label>
          <input type="text"
                 id="taskSection" 
                 [(ngModel)]="task.section" 
                 class="form-control"
                 placeholder="Przypisz zadanie do sekcji..."
                 [readonly]="!(task.area == 'Materiały referencyjne')">
        </div>
      </div>

      <div class="form-row">
        <!-- Task recurrence frequency -->
        <div class="form-group col-sm-6">
          <label for="taskRecurrenceFrequency">Częstotliwość:</label>
          <input type="number" 
                 [(ngModel)]="task.recurrenceFrequency"
                 id="taskRecurrenceFrequency" 
                 class="form-control"
                 [class.text-danger]="task.recurrenceFrequency < 1">
        </div>

        <!-- Task frequency type -->
        <div class="form-group col-sm-6">
          <label for="taskFrequencyType">Typ częstotliwości:</label>
          <input type="text" 
                 [(ngModel)]="task.frequencyType"
                 id="taskFrequencyType" 
                 class="form-control">
        </div>
      </div>

      <div class="form-group">
        <label for="tasksProject">Przypisz zadanie do projektu</label>
        <select id="tasksProject" [(ngModel)]="task.projectId" class="form-control" name="area">
          <option *ngFor="let project of projects | async" [value]="project.id">{{project.name}}</option>
        </select>
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
  projects;
  
  @Input() task: Task;
  @Output() onSave = new EventEmitter();

  save(){
    let copy = this.copyTask;
    if(copy.recurrenceFrequency && copy.recurrenceFrequency < 1) return;
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

  constructor(private taskService: TaskService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projectsService.getProjectsStream()
    .map( 
      projects => projects.filter(
       project => project.finnished == false
    ))
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

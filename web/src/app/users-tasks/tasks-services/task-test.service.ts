import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TaskTestService implements TaskService {

  search(query: any) {
    let foundResults: Task[] = [];
    this.tasks.forEach(task => {
      if(task.name.indexOf(query) >= 0) foundResults.push(task);
    });
    this.taskStream.next(foundResults);
  }
  taskStream = new Subject<Task[]>();
  tasks: Task[] = [
    {id: 1, name: "Umyć naczynia", area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI, userId: 123},
    {id: 2, name: "Umyć naczynia 2", area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI, userId: 123},
    {id: 3, name: "Umyć naczynia 3", area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI, userId: 123},
    {id: 4, name: "Odkurzyć przedpokój", area: Obszar.MOZE_KIEDYS, userId: 123},
    {id: 5, name: "Zamieść liście", area: Obszar.W_PIERWSZEJ_CHWILI, userId: 123},
    {id: 6, name: "Nakarmić kota", area: Obszar.OBOWIAZKI, userId: 123},
    {id: 7, name: "Pierwsze zadanie projektu 1", area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI, finnishedProjectStage: false, projectId: 1, userId: 123},
    {id: 8, name: "Drugie zadanie projektu 1", area: Obszar.OBOWIAZKI, finnishedProjectStage: false, projectId: 1, userId: 123},
    {id: 9, name: "Pierwsze zadanie projektu 2", area: Obszar.W_PIERWSZEJ_CHWILI, finnishedProjectStage: false, projectId: 2, userId: 123}
  ];

  constructor(private http:HttpClient) {
    this.updateUsersTasks();
  }

  getTasksStream(): Observable<Task[]> {
    return Observable
          .from(this.taskStream)
          .startWith(this.tasks);
  }

  save(task: Task) {
    if(task.id != null) this.modify(task);
    else{
      this.tasks.push(task);
      this.updateUsersTasks();
    }
  }

  modify(task){
    let task1 = this.tasks.find(t => t.id == task.id)
    let index = this.tasks.indexOf(task1);

    this.tasks[index] = task;
    this.updateUsersTasks();
  }

  updateUsersTasks(){
    this.taskStream.next(this.tasks);
  }

  updateProjectsTasks(projectId){
    let local: Task[] = new Array<Task>();
    this.tasks.forEach( task => {
      if(task.projectId == projectId && task.finnishedProjectStage == false){
        local.push(task);
      }
    })
    this.taskStream.next(local);
  }

}

import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProjectStage } from '../../users-projects/services/projects.service';


@Injectable()
export class TaskTestService implements TaskService {

  taskStream = new Subject<Task[]>();
  tasks: Task[] = [
    {
      id: 1,
      name: "Umyć naczynia",
      area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      userId: 123
    },
    {
      id: 2,
      name: "Umyć naczynia 2",
      area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      userId: 123
    },
    {
      id: 3,
      name: "Umyć naczynia 3",
      area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      userId: 123
    },
    {
      id: 4,
      name: "Odkurzyć przedpokój",
      area: Obszar.MOZE_KIEDYS,
      userId: 123
    },
    {
      id: 5,
      name: "Zamieść liście",
      area: Obszar.W_PIERWSZEJ_CHWILI,
      userId: 123
    },
    {
      id: 6,
      name: "Nakarmić kota",
      area: Obszar.OBOWIAZKI,
      userId: 123
    }
  ];

  constructor(private http:HttpClient) {
    this.updateUsersTasks();
  }

  getTasksStream(area: Obszar): Observable<Task[]> {
    return Observable
          .from(this.taskStream)
          .startWith(this.tasks)
          .map(
            tasks => tasks.filter(
              task => task.area == area
            ))
          
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

}

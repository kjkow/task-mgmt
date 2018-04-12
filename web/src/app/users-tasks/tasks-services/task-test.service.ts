import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TaskTestService implements TaskService {

  taskStream = new Subject<Task[]>();
  tasks: Task[] = [
    {
      name: "Umyć naczynia",
      area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      idUzytkownika: 123
    },
    {
      name: "Umyć naczynia 2",
      area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      idUzytkownika: 123
    },
    {
      name: "Umyć naczynia 3",
      area: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      idUzytkownika: 123
    },
    {
      name: "Odkurzyć przedpokój",
      area: Obszar.MOZE_KIEDYS,
      idUzytkownika: 123
    },
    {
      name: "Zamieść liście",
      area: Obszar.W_PIERWSZEJ_CHWILI,
      idUzytkownika: 123
    },
    {
      name: "Nakarmić kota",
      area: Obszar.OBOWIAZKI,
      idUzytkownika: 123
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

  addTask(task: Task) {
    this.tasks.push(task);
    this.updateUsersTasks();
  }

  updateUsersTasks(){
    this.taskStream.next(this.tasks);
  }

}

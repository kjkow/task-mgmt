import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';

@Injectable()
export class TaskTestService implements TaskService {

  addTask(task: Task): Task {
    this.tasks.push(task);
    return task;
  }
  getUsersTasksForArea(userId: number, area: Obszar): Task[] {
    let tasksToReturn: Array<Task> = new Array;
    this.tasks.forEach(element => {
      if(element.idUzytkownika == userId && element.obszar == area){
        tasksToReturn.push(element);
      }
    });
    return tasksToReturn;
  }
  tasks: Task[] = [
    {
      nazwa: "Umyć naczynia",
      obszar: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      idUzytkownika: 123
    },
    {
      nazwa: "Umyć naczynia 2",
      obszar: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      idUzytkownika: 123
    },
    {
      nazwa: "Umyć naczynia 3",
      obszar: Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI,
      idUzytkownika: 123
    },
    {
      nazwa: "Odkurzyć przedpokój",
      obszar: Obszar.MOZE_KIEDYS,
      idUzytkownika: 123
    },
    {
      nazwa: "Zamieść liście",
      obszar: Obszar.W_PIERWSZEJ_CHWILI,
      idUzytkownika: 123
    },
    {
      nazwa: "Nakarmić kota",
      obszar: Obszar.OBOWIAZKI,
      idUzytkownika: 123
    }
  ];
  
  constructor() { }

}

import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TaskTestService implements TaskService {

  constructor() {
    this.updateUsersTasks();
  }

  taskStream = new Subject<Task[]>();

  getTasksStream(area: Obszar): Observable<Task[]> {
    return Observable
          .from(this.taskStream)
          .startWith(this.tasks)
          .map(
            tasks => tasks.filter(
              task => task.obszar == area
            ))
          
  }


  // addTask(task: Task): Observable<Task> {
  //   this.tasks.push(task);
  //   return task;
  // }

  
  updateUsersTasks(){
    //tutaj niby wołamy http get i pobieramy do naszej lokalnej tablicy zadania
    // do api będziemy wołać zadania po id użytkownika - z usługi lub kontekstu
    //TODO: te zadania można by wynieść do pliku
    this.taskStream.next(this.tasks);
  }

  //lokalna tablica przechowująca pobrane elementy z bazy danych
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
  
}

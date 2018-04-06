import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';
import { Subject, Observable } from 'rxjs';

@Injectable()
//TODO: czy aby na pewno potrzebuję 6 strumieni? wydaje się że tak...
export class TaskTestService implements TaskService {

  constructor() {}


  getTasksStream(area: Obszar): Observable<Task[]> {
    switch(area){
      case Obszar.W_PIERWSZEJ_CHWILI: return this.taskStream_W_PIERWSZEJ_CHWILI;
      case Obszar.MATERIALY_REFERENCYJNE: return this.taskStream_MATERIALY_REFERENCYJNE;
      case Obszar.OBOWIAZKI: return this.taskStream_OBOWIAZKI;
      case Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI: return this.taskStream_W_NIEDALEKIEJ_PRZYSZLOSCI;
      case Obszar.MOZE_KIEDYS: return this.taskStream_MOZE_KIEDYS;
      case Obszar.UKONCZONE: return this.taskStream_UKONCZONE;
    }
  }

  taskStream_W_PIERWSZEJ_CHWILI = new Subject<Task[]>();
  taskStream_MATERIALY_REFERENCYJNE = new Subject<Task[]>();
  taskStream_OBOWIAZKI = new Subject<Task[]>();
  taskStream_W_NIEDALEKIEJ_PRZYSZLOSCI = new Subject<Task[]>();
  taskStream_MOZE_KIEDYS = new Subject<Task[]>();
  taskStream_UKONCZONE = new Subject<Task[]>();
  
  taskList_W_PIERWSZEJ_CHWILI = new Array<Task>();
  taskList_MATERIALY_REFERENCYJNE = new Array<Task>();
  taskList_OBOWIAZKI = new Array<Task>();
  taskList_W_NIEDALEKIEJ_PRZYSZLOSCI = new Array<Task>();
  taskList_MOZE_KIEDYS = new Array<Task>();
  taskList_UKONCZONE = new Array<Task>();



  // addTask(task: Task): Observable<Task> {
  //   this.tasks.push(task);
  //   return task;
  // }


  //TODO: słabe rozwiązanie!
  getUsersTasksForArea(area: Obszar){ /*TODO: idUzytkownika z kontekstu lub usługi*/
    switch(area){

      case Obszar.W_PIERWSZEJ_CHWILI: 
        let tasksToAdd1: Array<Task> = new Array;
        this.tasks.forEach(task =>{
          if(task.idUzytkownika == 123 && task.obszar == Obszar.W_PIERWSZEJ_CHWILI){
            tasksToAdd1.push(task);
          }
        });
        this.taskStream_W_PIERWSZEJ_CHWILI.next(tasksToAdd1);
        break;
      
      case Obszar.MATERIALY_REFERENCYJNE: 
        let tasksToAdd2: Array<Task> = new Array;
        this.tasks.forEach(task =>{
          if(task.idUzytkownika == 123 && task.obszar == Obszar.MATERIALY_REFERENCYJNE){
            tasksToAdd2.push(task);
          }
        })
        this.taskStream_MATERIALY_REFERENCYJNE.next(tasksToAdd2);
        break;

      case Obszar.OBOWIAZKI: 
        let tasksToAdd3: Array<Task> = new Array;
        this.tasks.forEach(task =>{
          if(task.idUzytkownika == 123 && task.obszar == Obszar.OBOWIAZKI){
            tasksToAdd3.push(task);
          }
        })
        this.taskStream_OBOWIAZKI.next(tasksToAdd3);
        break;

      case Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI: 
        let tasksToAdd4: Array<Task> = new Array;
        this.tasks.forEach(task =>{
          if(task.idUzytkownika == 123 && task.obszar == Obszar.W_NIEDALEKIEJ_PRZYSZLOSCI){
            tasksToAdd4.push(task);
          }
        })
        this.taskStream_W_NIEDALEKIEJ_PRZYSZLOSCI.next(tasksToAdd4);
        break;

      case Obszar.MOZE_KIEDYS: 
        let tasksToAdd5: Array<Task> = new Array;
        this.tasks.forEach(task =>{
          if(task.idUzytkownika == 123 && task.obszar == Obszar.MOZE_KIEDYS){
            tasksToAdd5.push(task);
          }
        })
        this.taskStream_MOZE_KIEDYS.next(tasksToAdd5);
        break;

      case Obszar.UKONCZONE: 
        let tasksToAdd6: Array<Task> = new Array;
        this.tasks.forEach(task =>{
          if(task.idUzytkownika == 123 && task.obszar == Obszar.UKONCZONE){
            tasksToAdd6.push(task);
          }
        })
        this.taskStream_UKONCZONE.next(tasksToAdd6);
        break;
      }
  }

  //"baza danych"
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

import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TaskTestService implements TaskService {

  constructor(private http:HttpClient) {
    this.updateUsersTasks();
  }

  taskStream = new Subject<Task[]>();

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
    let body = {
      "name": task.name,
      "area": task.area
    }
    this.http.post<Task>("http://localhost:4500/tasks/add", body).subscribe(response => {
      this.updateUsersTasks();
    })
  }

  updateUsersTasks(){
    this.http.get<Array<Task>>("http://localhost:4500/tasks/")
    .subscribe((response) =>{
      this.tasks = response;
      console.log(this.tasks);
      this.taskStream.next(this.tasks);
    })
    //tutaj niby wołamy http get i pobieramy do naszej lokalnej tablicy zadania
    // do api będziemy wołać zadania po id użytkownika - z usługi lub kontekstu
    //TODO: te zadania można by wynieść do pliku
    
  }

  //lokalna tablica przechowująca pobrane elementy z bazy danych
  tasks: Task[] = [];
  
}

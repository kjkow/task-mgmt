import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Obszar } from './obszar.enum';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskRestService implements TaskService {

  taskStream = new Subject<Task[]>();
  tasks: Task[] = [];

  constructor(private http:HttpClient) {
    this.updateUsersTasks();
  }

  save(task: Task) {
    let body = this.prepareBody(task);
    if(task.id != null) this.modifyTask(task.id, body);
    else this.saveTask(task, body);
  }

  saveTask(task: Task, body){
    console.log(body);
    this.http.post<Task>("http://localhost:4500/tasks/add", body).subscribe(response => {
      console.log(response);
      this.updateUsersTasks();
    })
  }

  modifyTask(taskId, body){
    console.log(body);
    this.http.post<Task>("http://localhost:4500/tasks/update/" + taskId, body).subscribe(response =>{
      console.log(response);
      this.updateUsersTasks();
    })
  }

  getTasksStream(area: Obszar): Observable<Task[]> {
    return Observable
          .from(this.taskStream)
          .startWith(this.tasks)
          .map(
            tasks => tasks.filter(
              task => task.area == area
            ));
  }

  prepareBody(task: Task){
    return {
      "name": task.name,
      "area": task.area,
      "id": task.id,
      "userId": task.idUzytkownika,
      "priority": task.priorytet,
      "dueDate": task.termin,
      "comment": task.komentarz,
      "section": task.sekcja,
      "recurrenceFrequency": task.czestotliwoscPowtarzalnosci,
      "frequencyType": task.typCzestotliwosci
    }
  }

  updateUsersTasks() {
    this.http.get<Array<Task>>("http://localhost:4500/tasks/")
    .subscribe((response) =>{
      this.tasks = response;
      this.taskStream.next(this.tasks);
    })
  }
  


}

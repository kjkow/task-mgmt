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

  addTask(task: Task) {
    let body = {
      "name": task.name,
      "area": task.area
    }
    this.http.post<Task>("http://localhost:4500/tasks/add", body).subscribe(response => {
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

  updateUsersTasks() {
    this.http.get<Array<Task>>("http://localhost:4500/tasks/")
    .subscribe((response) =>{
      this.tasks = response;
      this.taskStream.next(this.tasks);
    })
  }
  


}

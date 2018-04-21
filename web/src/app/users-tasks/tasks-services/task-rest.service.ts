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

  getTasksStream(): Observable<Task[]> {
    return Observable
          .from(this.taskStream)
          .startWith(this.tasks);
  }

  prepareBody(task: Task){
    return {
      "name": task.name,
      "area": task.area,
      "id": task.id,
      "userId": task.userId,
      "priority": task.priority,
      "dueDate": task.dueDate,
      "comment": task.comment,
      "section": task.section,
      "recurrenceFrequency": task.recurrenceFrequency,
      "frequencyType": task.frequencyType,
      "projectId": task.projectId,
      "finnishedProjectStage": task.finnishedProjectStage,
      "ordinalNumber": task.ordinalNumber
    }
  }

  updateUsersTasks() {
    this.http.get<Array<Task>>("http://localhost:4500/tasks/")
    .subscribe((response) =>{
      this.tasks = response;
      this.taskStream.next(this.tasks);
    })
  }
  
  updateProjectsTasks(projectId: any) {
    //Tutaj nie ma potrzeby wołać api, sortujemy więc tylko lokalnie pobrane taski
    let local: Task[] = new Array<Task>();
    this.tasks.forEach( task => {
      if(task.projectId == projectId && task.finnishedProjectStage == false){
        local.push(task);
      }
    })
    this.taskStream.next(local);
  }

}

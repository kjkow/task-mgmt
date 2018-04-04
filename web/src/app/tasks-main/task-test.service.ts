import { Injectable } from '@angular/core';
import { TaskService, Task } from './task.service';

@Injectable()
export class TaskTestService implements TaskService {

  tasks: Task[] = [
    {
      nazwa: "Umyć naczynia",
      obszar: "W najbliższej przyszłości",
      idUzytkownika: 123
    },
    {
      nazwa: "Zamieść liście",
      obszar: "W wolnej chwili",
      idUzytkownika: 123
    }
  ];

  getUsersTasks(userId) {
    return this.tasks;
  }
  constructor() { }

}

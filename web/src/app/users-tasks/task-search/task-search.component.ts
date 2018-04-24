import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks-services/task.service';

@Component({
  selector: 'task-search',
  template: `
  <form class="form-inline my-2 my-lg-0">
    <input [(ngModel)]="query" name="searchQuery" class="form-control mr-sm-2" type="search" placeholder="Wpisz nazwę zadania" maxlength="30">
    <button class="btn btn-outline-info my-2 my-sm-0" (click)="search()" type="submit">Wyszukaj zadania</button>
  </form>
  `,
  styles: []
})
export class TaskSearchComponent implements OnInit {

  query;

  constructor(private taskService: TaskService) { }

  search(){
    this.taskService.search(this.query);
  }

  ngOnInit() {
  }

}

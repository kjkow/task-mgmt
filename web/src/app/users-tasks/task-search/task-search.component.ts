import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-search',
  template: `
  <form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2" type="search" placeholder="Wpisz nazwę zadania" maxlength="30">
    <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Wyszukaj zadania</button>
  </form>
  `,
  styles: []
})
export class TaskSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-navigation',
  template: `
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item active"><a class="nav-link">Bieżące zadania</a></li>
          <li class="nav-item "><a class="nav-link">Materiały referencyjne</a></li>
          <li class="nav-item "><a class="nav-link">Zadania ukończone</a></li>
        </ul>
      </div>  
      <button class="btn btn-outline-info my-2 my-sm-0 pull-right" type="submit">Zaloguj się</button>
    </nav>
  `,
  styles: []
})
export class TaskNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

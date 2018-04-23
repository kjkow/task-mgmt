import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-navigation',
  template: `
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item active"><a id="current" (click)="select($event)" class="nav-link">Bieżące zadania</a></li>
          <li class="nav-item "><a id="reference" (click)="select($event)" class="nav-link">Materiały referencyjne</a></li>
          <li class="nav-item "><a id="finnished"  (click)="select($event)" class="nav-link">Zadania ukończone</a></li>
          <li class="nav-item "><a id="projects"  (click)="select($event)" class="nav-link">Projekty</a></li>
        </ul>
        <task-search></task-search>
      </div>  
      <button class="btn btn-outline-info my-2 my-sm-0 pull-right" type="submit">Zaloguj się</button>
    </nav>
  `,
  styles: []
})
export class TaskNavigationComponent implements OnInit {

  @Output() selection = new EventEmitter();

  select(event){
    this.selection.emit(event.target.id);
  }

  constructor() { }

  ngOnInit() {
  }

}

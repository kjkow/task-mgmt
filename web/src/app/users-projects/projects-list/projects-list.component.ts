import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projects-list',
  template: `
    <h5>Twoje projekty</h5>
    <div class="card">Projekt1</div>
    <div class="card">Projekt2</div>
    <div class="card">Projekt3</div>
  `,
  styles: []
})
export class ProjectsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-area',
  template: `
  <div class="card-block">
    <ng-content class="card-title"></ng-content>
  </div>
  `,
  styles: []
})
export class TaskAreaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

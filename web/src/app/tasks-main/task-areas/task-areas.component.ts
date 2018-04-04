import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-areas',
  template: `
  <div class="contents">
  <div class="col-md-6 quarter card">test</div>
  <div class="col-md-6 quarter card">test</div>
  <div class="col-md-6 quarter card">test</div>
  <div class="col-md-6 quarter card">test</div>
  `,
  styles: [`
  .quarter{
    width:50%;
    height:100%;
    float:left;
  }
  .contents{
    height:50%;
    width:100%;
  }
  `]
})
export class TaskAreasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Obszar } from '../../services/obszar.enum';

@Component({
  selector: 'task-area',
  template: `
  <div class="card-block">
    <div class="card-title">{{obszar}}</div>
  </div>
  `,
  styles: []
})
export class TaskAreaComponent implements OnInit {

  @Input() obszar: Obszar;

  constructor() { }

  ngOnInit() {
  }

}

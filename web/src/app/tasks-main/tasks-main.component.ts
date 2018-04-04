import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Obszar } from './services/obszar.enum';

@Component({
  selector: 'tasks-main',
  template: `
  <div *ngFor="let item of obszaryZadan | obszaryZadanLista">
    {{ item }}
  </div> 
  `,
  styles: []
})
export class TasksMainComponent implements OnInit {

  obszaryZadan = Obszar;

  constructor() { }

  ngOnInit() {
  }

}

@Pipe({
  name: 'obszaryZadanLista'
})
export class ObszaryZadanLista implements PipeTransform {
  
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}

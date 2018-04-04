import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';


@Component({
  selector: 'tasks-main',
  template: `
  <h4>{{taskAreasTitle}}</h4>
  <task-areas></task-areas>
  <h4>{{referencesTitle}}</h4>
  <div>todo...</div>
  <h4>{{finnishedTitle}}</h4>
  <div>todo...</div>
  `,
  styles: []
})
export class UsersTasksComponent implements OnInit {

  taskAreasTitle = "Bieżące zadania";
  referencesTitle = Obszar.MATERIALY_REFERENCYJNE;
  finnishedTitle = Obszar.UKONCZONE;

  constructor() { }

  ngOnInit() {
  }

}

/**
 * do iterowania po enumie, może się przyda:
 * JS:  obszaryZadan = Obszar;
 *   <div *ngFor="let item of obszaryZadan | obszaryZadanLista">
    {{ item }}
  </div> 
 */

@Pipe({ //TODO: raczej do wywalenia, na początku myślałem że będę generował obszary zadań z listy, ale to mi nie pasuje do layotu
  name: 'obszaryZadanLista'
})
export class ObszaryZadanLista implements PipeTransform {
  
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}

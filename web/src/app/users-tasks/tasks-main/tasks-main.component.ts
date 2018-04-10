import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Obszar } from '../tasks-services/obszar.enum';


@Component({
  selector: 'tasks-main',
  template: `
  <h4>{{taskAreasTitle}}</h4>
  <div class="row">
  <task-areas class="col-8"></task-areas>
  
  <div class="onetask card col-4">
    <h6 class="card-title">Nowe zadanie</h6>
    <div class="card-text">Opisz swoje zadanie....</div>
  </div>
  
  </div>

  <div class="cl">
    <h4>{{referencesTitle}}</h4>
    todo...
  </div>
  
  <div class="cl">
    <h4>{{finnishedTitle}}</h4>
    todo...
  </div>
  `,
  styles: [`
  cl{
    clear: left;
  }
  .onetask{
    width:25%;
    float:left;
    height: 100%;
    min-height: 36em;
  }
  `]
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

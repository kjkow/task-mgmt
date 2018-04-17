import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projects-main',
  template: `
  <project-form></project-form>
  
  <div class="row">
    <projects-list (clicked)="onProjectPick($event)" class="col-sm"></projects-list>
    <div class="col-sm">
      Etapy projektu
    </div>
  </div>
  `,
  styles: []
})
export class ProjectsMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onProjectPick(project){
    console.log(project);//TODO: przekazać do komponentu formularza projektu
  }

}

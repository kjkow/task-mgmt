import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projects-main',
  template: `
  <div>Szczegóły projektu</div>
  
  <div class="row">
    <projects-list class="col-sm"></projects-list>
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

}

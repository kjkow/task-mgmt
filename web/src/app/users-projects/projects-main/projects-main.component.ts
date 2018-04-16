import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projects-main',
  template: `
  <div>Szczegóły projektu</div>
  
  <div class="row">
    <div class="col-sm">
      Twoje projekty
    </div>
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

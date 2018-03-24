import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="row">
      <button type="button" (click)="authorize()" class="btn btn-info">Zaloguj się z Google</button>
    </div>
  `,
  styles: []
})
export class SignInComponent implements OnInit {

  constructor() { }

  authorize(){
    console.log("Button clicked");
  }

  ngOnInit() {
  }

}

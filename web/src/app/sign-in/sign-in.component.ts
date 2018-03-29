import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="row">
      <button type="button" (click)="authorize()" class="btn btn-info">Zaloguj się z Google</button>
         <div>
    <h3 *ngIf="name">{{name}}</h3>
    <h3 *ngIf="lastName">{{lastName}}</h3>
    <h4 *ngIf="mail">{{mail}}</h4>
  </div>
    </div>
  `,
  styles: []
})
export class SignInComponent implements OnInit {



  constructor(private authService: AuthService) {
    var auth = localStorage.getItem('auth');
    if(auth){
      this.authService.getToken();

      var token = localStorage.getItem('access_token');

      //TODO: w tym momencie nie przyszła jeszcze odpowiedź z POST-a, więc nie ma jeszcze access_token, gdyby udało się jakoś zaczekać na tą odpowiedź....
      if(token){this.authService.getGoogleData(token).subscribe(data=>{
        this.name = data.name;
      })} else {

      }


    }}

  authorize(){
    this.authService.getToken();
  }

  ngOnInit() {
  }

  name ;
  lastName;
  mail;
}

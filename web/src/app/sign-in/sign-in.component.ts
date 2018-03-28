import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="row btn-group">
      <button type="button" (click)="authorize()" class="btn btn-info">Zaloguj się z Google</button>
      <button type="button" (click)="check()" class="btn btn-info">Sprawdź</button>
    </div>
  `,
  styles: []
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  authorize(){
    this.authService.getToken();
    
  }

  check(){
    console.log(localStorage.getItem('access_token'));
    //TODO: po pierwszym zalogowaniu nie mam w local storage tokena, dopiero jak drugi raz wywołam getToken()
  }

  ngOnInit() {
    
  }

}

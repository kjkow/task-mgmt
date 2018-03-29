import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.service';

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

  constructor(private authService: AuthService) { }

  authorize(){
    this.authService.getToken();
  }

  ngOnInit() {
  //TODO: jeśli mamy access token to wybierzmy z googla imie i nazwisko, i maila i wyswietmy tutaj
  }

}

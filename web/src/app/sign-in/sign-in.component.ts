import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { logging } from 'protractor';
import { UsersService } from './auth-service.service';



@Component({
  selector: 'app-sign-in',
  template: `
  <div class="row btn-group">
      <button *ngIf="!loggedIn" type="button" (click)="signInWithGoogle()" class="btn btn-info">Zaloguj się z Google</button>
      <button *ngIf="loggedIn" type="button" (click)="signOut()" class="btn btn-info">Wyloguj się</button>
  </div>
  <div *ngIf="loggedIn" class="card" >
    <div class="card-body">
    <h5 class="card-title">Zalogowany jako:</h5>
    <p>{{userInfo.name}} {{userInfo.lastName}} <br> {{userInfo.email}}</p>
    </div>
  </div>
  `,//TODO: zrobić ładny html
  styles: []
})
export class SignInComponent implements OnInit {

  userInfo = {};

  loggedIn;

  constructor(private authService: AuthService, private userService: UsersService) {

  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
    this.userInfo = {};
  }

  ngOnInit() {
   setTimeout(()=>{
    this.authService.authState.subscribe((user) => {
      console.log("Trying to get user: " + user)
      if(user){
        this.userInfo = this.userService.getUser(user.email);
        if(!this.userInfo){
          this.userService.addUser(user);
          this.userInfo = this.userService.getUser(user.email);
        }
      }
      this.loggedIn = (user != null);
    });
   },5000); //TODO: działa, ale do poprawienia (routes!?) - trzeba jakoś poczekać na response

  }
  
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { logging } from 'protractor';
import { UsersService } from './auth-service.service';
import { User } from './customer';



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
    <p>{{userInfo.firstName}} {{userInfo.lastName}} <br> {{userInfo.email}}</p>
    </div>
  </div>
  `,//TODO: zrobić ładny html
  styles: []
})
export class SignInComponent implements OnInit {

  userInfo: User;

  loggedIn: boolean;

  constructor(private authService: AuthService, private userService: UsersService) {

  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
    this.userInfo.email = "";
    this.userInfo.firstName = "";
    this.userInfo.lastName = "";
  }

  ngOnInit() {
    this.userInfo = new User;
    this.loggedIn = false;
    setTimeout(()=>{
      this.authService.authState.subscribe((user) => {
        if(user){
          let u = this.userService.getUser(user).subscribe(u =>{
          this.userInfo.email = u.email;
          this.userInfo.firstName = u.firstName;
          this.userInfo.lastName = u.lastName;  
          
          if(this.userInfo != null) this.loggedIn = true;//TODO: kiedy nie ma użytkownika na bazie

          if(!this.userInfo && this.userInfo != undefined){
          this.userService.addUser(user);
          //this.userInfo = this.userService.getUser(user.email);
        }
        })
      }
    });
   },5000); //TODO: działa, ale do poprawienia (routes!?) - trzeba jakoś poczekać na response

  }
  
}

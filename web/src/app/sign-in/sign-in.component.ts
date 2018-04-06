import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

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
  <div *ngIf="userNotFound">
    <h5>Utworzyć nowe konto dla adresu e-mail {{emailAddress}}?</h5>
    <button type="button" (click)="register()" class="btn btn-info">Tak</button>
  </div>
  `,//TODO: zrobić ładny html
  styles: []
})
//TODO: za dużo flag, miesza się to wszystko trzeba to rozbić
export class SignInComponent implements OnInit {

  userInfo: User;

  loggedIn: boolean;

  emailAddress;
  userNotFound;
  socialUser;

  constructor(private userService: UsersService) {

  }

  register(){
    this.userService.addUser(this.socialUser).subscribe(u =>{
      this.userInfo.email = u.email;
      this.userInfo.firstName = u.firstName;
      this.userInfo.lastName = u.lastName;
      this.loggedIn = true;
    })
  }

  signInWithGoogle(): void {
    this.userService.signIn();
  }

  signOut(): void {
    this.userService.signOut();
    this.loggedIn = false;
    this.userNotFound = false;
    this.userInfo.email = "";
    this.userInfo.firstName = "";
    this.userInfo.lastName = "";
  }

  ngOnInit() {
    this.userInfo = new User;
    this.loggedIn = false;
    this.userNotFound = false;

    this.userService.getAuthenticationStateStream().subscribe((user) => {
      if(user){
        this.emailAddress = user.email;
        this.socialUser = user;
        this.userService.getUser(user).subscribe(u =>{
          if(u){
            this.userInfo.email = u.email;
            this.userInfo.firstName = u.firstName;
            this.userInfo.lastName = u.lastName;
            this.loggedIn = true;  
          }
      }, err => {
          if(err.error.status == 404){
              this.userNotFound = true;
        }
      })
    }
  });

  }
  
}

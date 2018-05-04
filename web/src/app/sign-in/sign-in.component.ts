import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-sign-in',
  template: `

  <button *ngIf="loggedIn" type="button" (click)="signOut()" class="btn btn-info">Wyloguj się</button>
  <div id="startWorkWith" *ngIf="!loggedIn && !openRegisterForm">
    <button type="button" (click)="enterWithGoogle()" class="btn btn-info">Rozpocznij pracę za pomocą konta Google</button>
  </div>

  <user-settings register="true" *ngIf="openRegisterForm && !loggedIn" title="Utwórz nowe konto" buttonMessage="Zarejestruj"></user-settings>
  `,
  styles: []
})
export class SignInComponent implements OnInit {

  private loggedIn: boolean;
  private openRegisterForm: boolean;

  constructor(private service: UserService) {
  }

  enterWithGoogle(){
    this.service.startWithGoogle();
    this.service.startWithGoogleDataStream().subscribe(response =>{
      if(response == "user not found") this.openRegisterForm = true;
      this.loggedIn = this.service.userInfo.loggedIn;
    })
  }

  signOut(): void {
    this.service.signOut();
    this.loggedIn = false;
    this.openRegisterForm = false;
  }

  ngOnInit() {
    this.loggedIn = false;
      this.service.getAuthenticationStateStream().subscribe(user => {
        if(user != null){
          this.service.proceedWithSocialUser(user).subscribe( user => {
            this.loggedIn = this.service.userInfo.loggedIn;
          })
        } else {
          this.loggedIn = false;
        }
      })
  }
  
}

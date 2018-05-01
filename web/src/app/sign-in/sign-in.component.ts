import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'app-sign-in',
  template: `

  <!--div >
      <button *ngIf="!loggedIn && !userNotFound" type="button" (click)="signInWithGoogle()" class="btn btn-info">Zaloguj się z Google</button>
      <button *ngIf="loggedIn" type="button" (click)="signOut()" class="btn btn-info">Wyloguj się</button>
  </div-->
  <div id="startWorkWith" *ngIf="!loggedIn">
    <button type="button" (click)="enterWithGoogle()" class="btn btn-info">Rozpocznij pracę za pomocą konta Google</button>
    <button type="button" (click)="signInWithDemoAccount()" class="btn btn-info">Sprawdź aplikację z kontem demo</button>
  </div>
  `,//TODO: zrobić ładny html
  styles: []
})
//TODO: za dużo flag, miesza się to wszystko trzeba to rozbić
export class SignInComponent implements OnInit {

  userInfo: User;

  loggedIn: boolean;

  userNotFound;
  socialUser;
  
  user: User;

  constructor(private userService: UsersService) {

  }

  enterWithGoogle(){
    //TODO: impl patrz notatnik
  }

  signInWithDemoAccount(){
    //TODO: impl patrz notatnik
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
    this.loggedIn = false;
    this.userService.getAuthenticationStateStream().subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
    }, error => {
      console.log(error)
    })
  }

  ngOnInitOld() {
    this.userInfo = new User;
    this.loggedIn = false;
    this.userNotFound = false;

    this.userService.getAuthenticationStateStream().subscribe((user) => {
      if(user){
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
    }else {
      this.userNotFound = true;
    }
  });

  }
  
}

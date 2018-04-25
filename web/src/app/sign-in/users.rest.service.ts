import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";

/**
 * Calls server api, uses google authentication with AuthService from angular4-social-login library
 */
@Injectable()
export class UsersRestService implements UsersService {

  userEmail;
  userName;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserInfo(){
    return {
      email: this.userEmail,
      name: this.userName
    }
  }

  getUser(user: User): Observable<User>{
    //TODO: localhost do wyciagniecia do konfiguracji
    return this.http.get<User>("http://localhost:4500/users/" + user.email).do(value => {
      this.userEmail = value.email;
      this.userName = value.name;
    })
  }

  addUser(user: User){    
    let body = {
      "name": user.name,
      "email": user.email
    }
    return this.http.post<User>("http://localhost:4500/users/add", body);
  }

  changeUserName(name){
    let body = {"email": this.userEmail};
    this.http.post<User>(`http://localhost:4500/users/${this.userName}`, body).subscribe(val => {
      this.userName = val.name;
    })
  }

  signIn(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(val => {
      this.userEmail = val.email;
      this.getUser(val).subscribe(user => {
        this.userName = user.name;
      })
    })
  }

  signOut(){
    this.authService.signOut().then(val => {
      this.userEmail = "";
    })
  }

  getAuthenticationStateStream(): Observable<User>{
    return this.authService.authState;    
  }
}

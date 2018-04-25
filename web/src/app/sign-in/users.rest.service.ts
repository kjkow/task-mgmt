import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { AppSettings } from '../app-main/app-settings';

/**
 * Calls server api, uses google authentication with AuthService from angular4-social-login library
 */
@Injectable()
export class UsersRestService implements UsersService {

  userLocalCopy: User = new User();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserInfo(){
    return this.userLocalCopy;
  }

  mapUserToLocal(user: User){
    this.userLocalCopy.email = user.email;
    this.userLocalCopy.name = user.name;
    this.userLocalCopy.notifications = user.notifications;
    this.userLocalCopy.daysBeforeDue = user.daysBeforeDue;
  }

  getUser(user: User): Observable<User>{
    return this.http.get<User>(AppSettings.API_ENDPOINT + "users/" + user.email)
                    .do(value => this.mapUserToLocal(value));
  }

  addUser(user: User){    
    let body = {
      "name": user.name,
      "email": user.email
    }
    return this.http.post<User>(AppSettings.API_ENDPOINT + "users/add", body)
                    .do(value => this.mapUserToLocal(value));
  }

  updateUserData(user: User){
    let body = {
      "email": user.email,
      "name": user.name,
      "notifications": user.notifications,
      "daysBeforeDue": user.daysBeforeDue
    };

    this.http.post<User>(AppSettings.API_ENDPOINT + `users/${this.userLocalCopy.name}`, body)
              .subscribe(value => this.mapUserToLocal(value));
  }

  signIn(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(val => {
      this.userLocalCopy.email = val.email;
      this.getUser(val).subscribe(value => this.mapUserToLocal(value))
    })
  }

  signOut(){
    this.authService.signOut().then(val => {
      this.userLocalCopy.email = "";
      this.userLocalCopy.name = "";
      this.userLocalCopy.notifications = null;
      this.userLocalCopy.daysBeforeDue = null;
    })
  }

  getAuthenticationStateStream(): Observable<User>{
    return this.authService.authState;    
  }
}

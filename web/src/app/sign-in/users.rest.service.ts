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

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(user): Observable<User>{
    return this.http.get<User>("http://localhost:4500/users/" + user.email);   //TODO: localhost do wyciagniecia do konfiguracji
  }

  addUser(user){
    let userName: String = user.name;

    let firstName;
    let lastName;

    if(userName.split(" ").length > 1){
      firstName = userName.split(" ")[0];
      lastName = userName.split(" ")[1];
    } else {
      firstName = userName;
      lastName = "";
    }
    
    let body = {
      "firstName": firstName,
      "lastName": lastName,
      "email": user.email
    }
    return this.http.post<User>("http://localhost:4500/users/add", body);
  }

  signIn(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(){
    this.authService.signOut();
  }

  getAuthenticationStateStream(): Observable<User>{
    return this.authService.authState;    
  }
}

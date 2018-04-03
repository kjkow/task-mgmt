import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './customer';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  users = [
    {
      email: "kamil.kowalczyk992@gmail.com",
      name: "Kamil",
      lastName: "Kowalczyk"
    }
  ]; //TODO: do wyniesienia do pliku i jako konfiguracja testowa, oraz provider testowy

  getUser(user){
    return this.http.get<User>("http://localhost:4646/users/" + user.email);   //TODO: localhost do wyciagniecia do konfiguracji
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
    return this.http.post<User>("http://localhost:4646/users/add", body);
  }
}

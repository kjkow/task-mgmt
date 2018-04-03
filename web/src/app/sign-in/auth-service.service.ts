import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  ]; //TODO: do wyniesienia do pliku i jako konfiguracja testowa

  getUser(user){
    return this.http.get<User>("http://localhost:4646/users/" + user.email);   //TODO: localhost do wyciagniecia do konfiguracji
  }

  addUser(user){
    this.users.push(user); //todo: http post users/add
  }
}

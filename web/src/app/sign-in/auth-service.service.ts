import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  constructor() { }

  users = [
    {
      email: "kamil.kowalczyk992@gmail.com",
      name: "Kamil",
      lastName: "Kowalczyk"
    }
  ]; //TODO: do wyniesienia do pliku i jako konfiguracja testowa

  getUser(email){
    var _user;
    this.users.forEach(user=>{
      if(user.email == email){
        _user = user;
      } 
    })
    return _user;
  }

  addUser(user){
    this.users.push(user);
  }
}

import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable, Subject } from 'rxjs';
import { User } from './user';

@Injectable()
export class UsersMockService implements UsersService {
 

  updateUserData(user: any) {
    throw new Error("Method not implemented.");
  }
  getUserInfo() {
    throw new Error("Method not implemented.");
  }
  constructor() { }

  users: Array<User> = [];

  user: User = {
    firstName: "John",
    lastName: "Doe",
    email: "testing@me.com",
    provider: "",
    id: "123",
    name: "John Doe",
    photoUrl: "abc.com",
    authToken: "qwerty"
  }

  emptyUser: User = {
    firstName: "",
    lastName: "",
    email: "",
    provider: "",
    id: "",
    name: "",
    photoUrl: "",
    authToken: ""
  }

  usersStream = new Subject<User>();

  getUser(user: User): Observable<User> {
    return Observable.of(this.user);
  }

  addUser(user: User): Observable<User> {
    throw new Error("Method not implemented. Should not be needed to use it with mock service");
  }

  signIn() {
    this.usersStream.next(this.user);  
  }
  signOut() {
    this.usersStream.next(this.emptyUser);
  }

  getAuthenticationStateStream(): Observable<User> {
    return Observable.from(this.usersStream);
  }

}

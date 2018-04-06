import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable()
export abstract class UsersService {

  /**
   * Checks if user exists on db by it's email property
   * @param user User to check if exists on db
   */
  abstract getUser(user): Observable<User>

  /**
   * Creates new user
   * @param user New user to save in db
   * @returns newly created user as stream
   */
  abstract addUser(user): Observable<User>

  abstract signIn();

  abstract signOut();

  abstract getAuthenticationStateStream(): Observable<User>
}

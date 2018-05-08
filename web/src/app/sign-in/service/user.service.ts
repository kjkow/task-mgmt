import { Injectable } from '@angular/core';
import { AuthService, SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider } from 'angular4-social-login';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app-main/app-settings';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UserService {

  private user: User;
  private socialUser: SocialUser;
  private startWithGoogleStream = new Subject<any>();
  private userLoggedInStream = new Subject<boolean>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public userLoggedInDataStream(){
    return Observable.from(this.userLoggedInStream).startWith(false);
  }

  public startWithGoogleDataStream(){
    return Observable.from(this.startWithGoogleStream);
  }

  public startWithGoogle(){
    if(this.socialUser) this.getUser();
    else this.authenticateGoogle();
  }

  public registerUser(user){
    user.userId = this.socialUser.id;
    this.http.post<User>(AppSettings.API_ENDPOINT + "users/add", user)
      .subscribe(response => {
        this.user = response;
        this.user.token = this.socialUser.authToken;
        this.userLoggedInStream.next(true);
        this.startWithGoogleStream.next(undefined);
      })
  }

  public get userInfo(){
    return {
      user: this.user,
      socialUser: this.socialUser
    }
  }

  public get token(){
    if(this.user) return this.user.token;
  }

  public getAuthenticationStateStream(): Observable<SocialUser>{
    return this.authService.authState;    
  }

  public signOut(){
    this.authService.signOut().then(value => {
      this.userLoggedInStream.next(false);
    })
  }

  /**
   * Checks if id of social user is saved in db
   * @param socialUser user from google auth to check in db
   */
  public checkIfSocialUserIsRegistered(socialUser){
    this.socialUser = socialUser;
    this.getUser();
  }

  updateUserData(user: User): Observable<User>{
    let body = {
      "userId": this.user.userId,
      "email": user.email,
      "name": user.name,
      "notifications": user.notifications,
      "daysBeforeDue": user.daysBeforeDue
    };

    return this.http.post<User>(AppSettings.API_ENDPOINT + `users/${this.user.userId}`, body)
      .do(value => this.user = user);
  }

  private getUser(){
    this.http.get<User>(AppSettings.API_ENDPOINT + "users/" + this.socialUser.id)
      .subscribe(
          response => {
            this.user = response;
            this.user.token = this.socialUser.authToken;
            this.userLoggedInStream.next(true);
          }, 
          err => {
            if(err.status == 404) this.startWithGoogleStream.next("user not found");
          });
  }

  private authenticateGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(socialUser => {
        this.socialUser = socialUser;
        this.getUser();
      });
  }

}

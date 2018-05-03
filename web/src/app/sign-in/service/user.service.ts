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
  private loggedIn: boolean;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loggedIn = false;
  }

  public startWithGoogleDataStream(){
    return Observable.from(this.startWithGoogleStream);
  }

  public startWithGoogle(){
    this.authenticateGoogle();
  }

  public registerUser(user){
    user.userId = this.socialUser.id;
    this.http.post<User>(AppSettings.API_ENDPOINT + "users/add", user)
      .subscribe(response => {
        this.user = response;
        this.loggedIn = true;
        this.startWithGoogleStream.next(undefined);
      })
  }

  public get userInfo(){
    return {
      user: this.user,
      socialUser: this.socialUser,
      loggedIn: this.loggedIn
    }
  }

  public getAuthenticationStateStream(): Observable<SocialUser>{
    return this.authService.authState;    
  }

  public signOut(){
    this.authService.signOut().then(value => {
      this.loggedIn = false;
    })
  }

  public proceedWithSocialUser(socialUser): Observable<User>{
    this.socialUser = socialUser;
    return this.getUser().do(response => {
      this.loggedIn = true;
      this.user = response;
    })
     
  }

  private getUser(): Observable<User>{
    return this.http.get<User>(AppSettings.API_ENDPOINT + "users/" + this.socialUser.id);
  }

  private authenticateGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(socialUser => {
        this.socialUser = socialUser;
        this.proceedUser();
      });
  }

  private proceedUser(){
    this.getUser()
      .subscribe(response => {
        this.user = response;
        this.loggedIn = true;
      }, err => {
        if(err.status == 404){
          this.startWithGoogleStream.next("user not found");
        }
      })
  }

}

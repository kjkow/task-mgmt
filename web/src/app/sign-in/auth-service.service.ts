import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  constructor(private http:HttpClient, ) { }

  getToken(){
    var code = localStorage.getItem('auth_code');
    
    if(!code){
      var match = window.location.href.match(/\?code=(.*?)#/);
      console.log(match);
      code = match && match[1];
      localStorage.setItem('auth_code', code)
    }
   
    if(!code){
      this.requestAuthCode();
    }

    this.changeAuthCodeToAccessToken(code);

   // localStorage.setItem('access_token', access_token);


    //this.httpHeaders.set('Authorization', 'Bearer ' + token);
    
    return code;
  }

  requestAuthCode(){
    localStorage.removeItem('auth_code');

    let location = 'https://accounts.google.com/o/oauth2/v2/auth';
    let redirect_uri = 'http://localhost:4200/';
    let client_id = '660414676955-apq8kh280raba6dhuq003mu4oo5c57bp.apps.googleusercontent.com';
    let prompt = 'consent';
    let response_type = 'code';
    let scope = 'https://www.googleapis.com/auth/userinfo.profile';
    let access_type = 'offline';

    window.location.replace(`${location}?redirect_uri=${redirect_uri}&prompt=${prompt}&response_type=${response_type}&client_id=${client_id}&scope=${scope}&access_type=${access_type}`);
    //let url = `${location}?redirect_uri=${redirect_uri}&prompt=${prompt}&response_type=${response_type}&client_id=${client_id}&scope=${scope}&access_type=${access_type}`;
  }

  changeAuthCodeToAccessToken(_code){
    let location = 'https://www.googleapis.com/oauth2/v4/token';
    let code = _code;
    let redirect_uri = 'http://localhost:4200/';
    let client_id = '660414676955-apq8kh280raba6dhuq003mu4oo5c57bp.apps.googleusercontent.com';
    let client_secret = 'ikckkvUK3Chl2COF46XghNmT';
    let scope = '';
    let grant_type = 'authorization_code';

    let url = `${location}?code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}&scope=${scope}&grant_type=${grant_type}`;

    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    this.http.post(url, httpOptions).toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);

  }

  private extractData(res: Response){
    console.log(res.json());
  }

  private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);  //TODO: dostaje odpowiedz z tego posta ze bad request, cos zle wysylam...
    return Promise.reject(error.message || error);
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  constructor(private http:HttpClient ) { }

  getToken(){
    console.log("start getToken()");

    var code = localStorage.getItem('auth_code');
    var auth = localStorage.getItem('auth');

    /**
     * jeśli nie będzie kodu to znaczy że zaraz będziemy się uwierzytelniać
     * ustawmy więc flagę auth = true w local storage
     * zdejmiemy ją po pomyślnym ustawieniu auth_code
     * w konstruktorze głównego komponentu będziemy sprawdzać tą flagę,
     * jeśli =true to zawołamy getToken żeby z paska adresu zmaczowała auth_code
     */
    if(!code && !auth){
      localStorage.setItem('auth', 'true');
    }


    if(!code){
      if(this.matchLocationToAuthCode(code)){
        localStorage.setItem('auth', 'false');
        this.changeAuthCodeToAccessToken(localStorage.getItem('auth_code'));
        return;
      }
    }

    if(!code){
      this.requestAuthCode();
    }

    //TODO: ustawienie access tokena w headersach
    //this.httpHeaders.set('Authorization', 'Bearer ' + token);

  }

  matchLocationToAuthCode(code){
    console.log("start matchLocationToAuthCode()");
    var match = window.location.href.match(/\?code=(.*?)#/);
    code = match && match[1];
    if(match){
      localStorage.setItem('auth_code', code);
      return true;
    }
    return false;
  }

  requestAuthCode(){
    console.log("start requestAuthCode()");
    localStorage.removeItem('auth_code');

    let location = 'https://accounts.google.com/o/oauth2/v2/auth';
    let redirect_uri = 'http://localhost:4200/';
    let client_id = '660414676955-apq8kh280raba6dhuq003mu4oo5c57bp.apps.googleusercontent.com';
    let prompt = 'consent';
    let response_type = 'code';
    let scope = 'https://www.googleapis.com/auth/userinfo.profile';
    let access_type = 'offline';

    window.location.replace(`${location}?redirect_uri=${redirect_uri}&prompt=${prompt}&response_type=${response_type}&client_id=${client_id}&scope=${scope}&access_type=${access_type}`);
    //UWAGA: to mi spowoduje ze bedziemy budowac caly modul od zera, bo przechodzimy na inna strone, a potem wracamy. Po tym kodzie funkcja wykonuje reszte instrukcji po czym robi redirecta
  }

  changeAuthCodeToAccessToken(_code){
    console.log("start changeAuthCodeToAccessToken()");
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

  private extractData(res){
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('refresh_token', res.refresh_token);
    localStorage.setItem('id_token', res.id_token);
    localStorage.setItem('expires_in', res.expires_in);
    localStorage.setItem('token_type', res.token_type);
    //TODO: moze zapisac to w session storage??
  }

  private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}

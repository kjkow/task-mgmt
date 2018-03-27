import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {

  constructor(/*private httpHeaders:HttpHeaders*/) { }

  getToken(){
    var token = localStorage.getItem('access_token')
    
    if(!token){
      var match = window.location.href.match(/\?code=(.*?)#/);
      console.log(match);
      token = match && match[1];
      localStorage.setItem('access_token', token)
    }
   
    if(!token){
      this.authorize();
    }
    
    //this.httpHeaders.set('Authorization', 'Bearer ' + token);
    
    return token;
  }

  authorize(){
    localStorage.removeItem('access_token')

    let location = 'https://accounts.google.com/o/oauth2/v2/auth';
    let redirect_uri = 'http://localhost:4200/';
    let client_id = '660414676955-apq8kh280raba6dhuq003mu4oo5c57bp.apps.googleusercontent.com';
    let prompt = 'consent';
    let response_type = 'code'
    let scope = 'https://www.googleapis.com/auth/userinfo.profile';
    let access_type = 'offline';

    window.location.replace(`${location}?redirect_uri=${redirect_uri}&prompt=${prompt}&response_type=${response_type}&client_id=${client_id}&scope=${scope}&access_type=${access_type}`)
    //let url = `${location}?redirect_uri=${redirect_uri}&prompt=${prompt}&response_type=${response_type}&client_id=${client_id}&scope=${scope}&access_type=${access_type}`;
  }

}

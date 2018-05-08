import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../sign-in/service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: UserService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let user = this.auth.userInfo.socialUser;
    if(user){
      const authToken = user.authToken;
      const userId = user.id;
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken).set('Identification', userId)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}

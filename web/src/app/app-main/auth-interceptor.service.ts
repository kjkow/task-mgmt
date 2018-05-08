import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../sign-in/service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: UserService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(this.auth.token){
      const authToken = this.auth.token;
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}

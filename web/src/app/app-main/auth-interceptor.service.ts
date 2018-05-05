import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../sign-in/service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: UserService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.userInfo.user.token;
 
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
 
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

}

import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, handle: HttpHandler) {
    return this.authService.User.pipe(take(1), exhaustMap(user => {
      if(!user)
      {
        return handle.handle(req);
      }
      const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) })
      return handle.handle(modifiedReq);
    }));
  }
}

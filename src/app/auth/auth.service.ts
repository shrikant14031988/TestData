import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { AuthResponseData } from './auth.response.modeal';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public User = new BehaviorSubject<UserModel>(null);
  public tokenExpirationTimer: any;

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8SW0XKkrgl_4AHjjO5g9yOkNjz8Wv7hk',
      //return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.HandleError), tap(respData => {
        this.HandleAuthentication(respData);
      }))
  }

  signin(usenrName: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8SW0XKkrgl_4AHjjO5g9yOkNjz8Wv7hk',
      //return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {
        email: usenrName,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.HandleError), tap(respdata => {
        this.HandleAuthentication(respdata);
      }));
  }

  private HandleAuthentication(respdata: AuthResponseData) {
    const expire = new Date(new Date().getTime() + +respdata.expiresIn * 1000);
    const userData = new UserModel(respdata.email, respdata.localId, respdata.idToken, expire);
    this.User.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    this.autoLogout(+respdata.expiresIn * 1000);
  }

  private HandleError(handleError: HttpErrorResponse) {
    let defalutError = 'An error occured';
    if (!handleError.error || !handleError.error.error) {
      return throwError(defalutError);
    }
    switch (handleError.error.error.message) {
      case 'EMAIL_EXISTS':
        defalutError = 'User Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        defalutError = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        defalutError = 'Invalid Password';
        break;
      default:
        defalutError = 'Invalid Operation';
        break;
    }
    return throwError(defalutError);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiration: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration));
    if (loadedUser.token) {
      this.User.next(loadedUser);
      const time = new Date(+userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(time);
    }
  }

  logout() {
    this.User.next(null);
    this.router.navigate(['./auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationTimeout: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTimeout);
  }
}

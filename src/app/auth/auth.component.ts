import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.response.modeal';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  isLoginMode = true;
  isLoading = false;
  isError: string = null;

  ngOnInit(): void {
  }

  onSubmit(formVales: NgForm) {
    let authResponse: Observable<AuthResponseData>;

    const userName = formVales.value.email;
    const password = formVales.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      authResponse = this.authService.signin(userName, password);
    } else {
      authResponse = this.authService.signup(userName, password);
    }

    authResponse.subscribe((response: any) => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['./recipe'])
    },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.isError = error;
      }
    );
    formVales.reset();
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  closeAletbox() {
    this.isError = '';
  }
}

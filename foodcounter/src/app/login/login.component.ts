
import { Component, OnInit } from '@angular/core';

import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
  ) {  }

  ngOnInit(){
    
  }
  // createForm() {
  //   this.loginForm = this.fb.group({
  //     email: ['', Validators.required ],
  //     password: ['',Validators.required]
  //   });
  // }

  // tryFacebookLogin(){
  //   this.authService.doFacebookLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   })
  // }

  // tryTwitterLogin(){
  //   this.authService.doTwitterLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   })
  // }

  // tryGoogleLogin(){
  //   this.authService.doGoogleLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   })
  // }

  // tryLogin(value){
  //   this.authService.doLogin(value)
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //   })
  // }
}

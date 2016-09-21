import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Http, Response, Request, RequestMethod} from '@angular/http';

@Component({
  selector: 'login-form',
  template : `
  <div class="jumbotron" *ngIf="!authenticated">
    <h2>Login Form</h2>
    <form [formGroup]="loginForm" (ngSubmit)="submitForm(loginForm.value)">
      <div class="form-group" [ngClass]="{'has-error':!loginForm.controls['email'].valid && loginForm.controls['email'].touched}">
        <label>Email:</label>
        <input class="form-control" type="text" placeholder="John@doe.com" [formControl]="loginForm.controls['email']">
        <div *ngIf="loginForm.controls['email'].hasError('required') && loginForm.controls['email'].touched" class="alert alert-danger">You must add an email.</div>
      </div>
      <div class="form-group" [ngClass]="{'has-error':!loginForm.controls['password'].valid && loginForm.controls['password'].touched}">
        <label>Password:</label>
        <input class="form-control" type="password" placeholder="Password" [formControl]="loginForm.controls['password']">
        <div *ngIf="loginForm.controls['password'].hasError('required') && loginForm.controls['password'].touched" class="alert alert-danger">You must add a password.</div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" [disabled]="!loginForm.valid">Submit</button>
      </div>
    </form>
  </div>
  <div class="jumbotron text-center" *ngIf="authenticated">
    <img src="{{profile.picture}}" />
    <h2>Welcome, {{profile.email}}</h2>
    <a (click)="logout()">Logout</a>
  </div>
  `
})
export class LoginComponent {
  loginForm : FormGroup;
  authenticated: boolean
  profile : Object;

  constructor(fb: FormBuilder, public http: Http){
    if(localStorage.getItem('jwt')){
      this.authenticated = true;
      this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    this.loginForm = fb.group({
      'email' : [null, Validators.required],
      'password': [null, Validators.required],
    })
  }

  submitForm(value: any){
    let form = {
      'client_id' : 'YOUR-AUTH0-CLIENT-ID',
      'username' : value.email,
      'password' : value.password,
      'connection' : 'YOUR-DATABASE-CONNECTION-NAME',
      'grant_type' : 'password',
      'scope' : 'openid name email'
    }

    this.http.post('https://YOUR-AUTH0-DOMAIN.auth0.com/oauth/ro', form).subscribe(
      (res:any)=>{
        let data = res.json();
        if(data.id_token){
          localStorage.setItem('jwt', data.id_token);
          this.getUserInfo(data);
        }
      }
    )
  }

  getUserInfo(data: any){
    let form = {
      'id_token' : data.id_token
    }
    this.http.post('https://YOUR-AUTH0-DOMAIN.auth0.com/tokeninfo', form).subscribe(
      (res:any)=>{
        let data = res.json();
        this.profile = data;
        localStorage.setItem('profile', JSON.stringify(data));
        this.authenticated = true;
        this.loginForm.reset();
      }
    )
  }
  
  logout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('profile');
    this.authenticated = false;
  }
}

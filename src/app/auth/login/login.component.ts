import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { loginStart } from '../state/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFrom:FormGroup;
  constructor(private store:Store<AppState>) {
    this.loginFrom = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
   }

  ngOnInit(): void {
   
  }

  onLoginSubmit(){
    // console.log(this.loginFrom.value);
    const email = this.loginFrom.value.email;
    const password = this.loginFrom.value.password;
    this.store.dispatch(loginStart({email,password}))
  }

}

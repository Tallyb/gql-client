import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Angular2Apollo } from 'angular2-apollo';

import 'rxjs/add/operator/toPromise';

import { loginMutation } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  public error: string;
  public userId: string;

  constructor(public fb: FormBuilder,
    private apollo: Angular2Apollo,
    private localStorage: LocalStorageService
  ) { }

  doLogin(event) {
    this.error = '';
    this.userId = '';
    console.log(event);
    this.apollo.mutate({
      mutation: loginMutation,
      variables: {
        cred: this.loginForm.value,
      },
    })
      .toPromise()
      .then((res) => {
        console.log(res);
        this.userId = res.data.UserLogin.id;
        localStorage.setItem('token', this.userId);
      }).catch((error) => {
        this.error = error.message;
      });
  }

  ngOnInit() {
  }

}

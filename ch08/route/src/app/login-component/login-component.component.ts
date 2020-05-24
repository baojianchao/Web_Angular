import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, Form, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router'

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})


export class LoginComponentComponent implements OnInit {
  ngOnInit(): void {
  }

  myForm: FormGroup;//对应登录的表单
  userName: AbstractControl;  //输入用户名的输入控件
  password: AbstractControl;//输入密码的输入控件
  name$: Observable<string>;
  baseUrl = 'http://127.0.0.1:8080/';
  a: number;
  b: number;

  onSubmit(value: any) {
    console.log(value);
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private router: Router) {
    this.a = 0;
    this.b = 0;
    this.myForm = this.fb.group({
      'userName': ['admin', Validators.compose([Validators.required, userNameValidator])],
      'password': ['000000', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  login() {
    console.log(this.myForm.value);

    this.http.post(this.baseUrl + 'verify', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ === 'true') {
          this.authService.login();
          this.router.navigate(['/management']);
        }
      });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup | any;
  // loginInvalid: boolean | any;
  Message: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        Usuario: ['', [Validators.required]],
        Password: ['', [Validators.required]]
      }
    );
  }

  get f() { return this.form.controls; }

  login() {
    if (this.form.valid) {
      this.authService.authenticate(this.form.value)
        .subscribe(
          (user: any) => {
            localStorage.setItem('token', user['Token'])
            this.router.navigate(['home']);
          }
          , error => {
            this.Message = error.error.Message;
          });
    } else {
      console.log(this.form.valid)
    }
  }

}

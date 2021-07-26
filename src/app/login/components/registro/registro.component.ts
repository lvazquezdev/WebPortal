import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from './../../../shared/validators/custom-validators';

import { AuthService } from './../../../core/services/auth.service';
import { LoginModel } from '../../../models/login';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup | any;
  Message: string | any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        Usuario: ['', [Validators.required]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword: ['', [Validators.required]]
      }, {
      validator: CustomValidator.ConfirmPassword('Password', 'ConfirmPassword')
    }
    );
  }

  get f() { return this.form.controls; }

  save() {
    if (this.form.valid) {

      let newUser: LoginModel = {
        Usuario: this.form.get('Usuario').value,
        Password: this.form.get('Password').value
      }
      this.authService.register(newUser)
        .subscribe((user: any) => {
          localStorage.setItem('token', user['Token'])
          this.router.navigate(['home']);
        }, error => {
          this.Message = error.error.Message;
        });
    }
  }

}

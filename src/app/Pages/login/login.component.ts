import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/service/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  login() {
    const { email , password } = this.form.value;
    if (this.form.valid) {
      if(email && password) {
        this.authService.login(email, password)
          .subscribe((res) => {
            if (res) {
              this.toastr.success('Login successful!');
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 1000)
            }
            else {
              this.toastr.error('Login failed!');
              this.errorMessage = 'Account or password is incorrect.';
              this.form.controls.email.setErrors({'invalid': true});
              this.form.controls.password.setErrors({'invalid': true});
            }
          })
      }
    }
  }
}

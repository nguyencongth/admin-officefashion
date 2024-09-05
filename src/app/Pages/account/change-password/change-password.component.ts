import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {StaffService} from "../../../core/service/staff.service";
import {MatIconModule} from "@angular/material/icon";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  hide = true;
  hide1 = true;
  hide2 = true;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private toastr: ToastrService
  ) {}

  changePasswordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmNewPassword: ['', Validators.required]
  });

  changePassword() {
    const {currentPassword, newPassword, confirmNewPassword} = this.changePasswordForm.value;
    const managerId = Number(localStorage.getItem('managerId'));
    console.log(managerId);
    this.staffService.changePassword(managerId, currentPassword, newPassword, confirmNewPassword).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.toastr.success('Change password successfully');
        this.errorMessage = '';
        this.changePasswordForm.reset();
      }
      else if (response.statusCode === 401) {
        this.errorMessage = response.statusMessage;
        this.changePasswordForm.controls.currentPassword.setErrors({ incorrect: true });
      }
      else if (response.statusCode === 400) {
        this.errorMessage = response.statusMessage;
        this.changePasswordForm.controls.confirmNewPassword.setErrors({ invalid: true });
      }
    });
  }
}

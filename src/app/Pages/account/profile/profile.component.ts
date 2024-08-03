import {Component, OnInit} from '@angular/core';
import {Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {StaffService} from "../../../core/service/staff.service";
import {MatButton} from "@angular/material/button";
import {RoleService} from "../../../core/service/role.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf,
    NgFor,
    MatSelect,
    MatOption,
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private roleService: RoleService
  ) {}

  formProfile = this.fb.group({
    managerId: [Number(localStorage.getItem('managerId'))],
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required],
    roleId: {value: '', disabled: true},
    roleName: {value: '', disabled: true},
  })

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile() {
    const managerId = Number(localStorage.getItem('managerId'));
    forkJoin([
      this.staffService.getStaffById(managerId),
      this.roleService.getRoleList()
    ]).subscribe(([profileRes, roles]) => {
      const profile = profileRes.arrayManager[0];
      const roleName = roles.roles.find((role: any) => role.roleId === profile.roleId)?.roleName;
      const dataProfile = {...profile, roleName: roleName || ''};
      this.formProfile.patchValue(dataProfile);
    });
  }

  updateProfile() {
    this.staffService.updateStaffInfo(this.formProfile.value).subscribe((res) => {
      if(res) {
        this.getProfile();
      }
    });
  }
}

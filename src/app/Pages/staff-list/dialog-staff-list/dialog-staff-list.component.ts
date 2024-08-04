import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {NgFor, NgIf} from "@angular/common";
import {RoleService} from "../../../core/service/role.service";
import {StaffService} from "../../../core/service/staff.service";

@Component({
  selector: 'app-dialog-staff-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './dialog-staff-list.component.html',
  styleUrl: './dialog-staff-list.component.css'
})
export class DialogStaffListComponent implements  OnInit {
  arrRoles: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogStaffListComponent>,
    private fb: FormBuilder,
    private roleService: RoleService,
    private staffService: StaffService
  ) {}

  ngOnInit() {
    this.getRoles();
  }
  formStaff = this.fb.group({
    fullName: [this.data.fullName, Validators.required],
    email: [this.data.email, [Validators.required, Validators.email]],
    phoneNumber: [this.data.phoneNumber, [Validators.required]],
    password: [this.data.password, [Validators.required, Validators.min(6)]],
    roleId: [this.data.roleId, Validators.required],
  });

  getRoles() {
    this.roleService.getRoleList().subscribe(data => {
      this.arrRoles = data.roles;
    })
  }

  addStaff() {
    const data = this.formStaff.value;
    this.staffService.addStaff(data).subscribe(data => {
      if (data) {
        this.dialogRef.close(true);
      }
    })
  }
  updateStaff() {
    const managerId  = this.data.managerId;
    const data = {managerId, ...this.formStaff.value};
    this.staffService.adminUpdateStaffInfo(data).subscribe((data) => {
      if (data) {
        this.dialogRef.close(true);
      }
    })
  }
  handleClick(isAdd: boolean) {
    if(isAdd) {
      this.addStaff();
    } else {
      this.updateStaff();
    }
  }
}

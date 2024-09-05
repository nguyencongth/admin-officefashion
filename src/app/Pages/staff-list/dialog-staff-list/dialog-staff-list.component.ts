import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {NgFor, NgIf} from "@angular/common";
import {RoleService} from "../../../core/service/role.service";
import {StaffService} from "../../../core/service/staff.service";
import {ToastrService} from "ngx-toastr";

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
  styleUrl: './dialog-staff-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogStaffListComponent implements OnInit {
  arrRoles: any[] = [];
  @Output() unsavedChangesEvent = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogStaffListComponent>,
    private fb: FormBuilder,
    private roleService: RoleService,
    private staffService: StaffService,
    private toastr: ToastrService
  ) {
    this.formStaff.valueChanges.subscribe(() => {
      this.unsavedChangesEvent.emit(true);
    });
  }

  ngOnInit() {
    this.getRoles();
    this.dialogRef.backdropClick().subscribe(() => {
      if (this.formStaff.dirty) {
        const confirm = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
        if (!confirm) {
          this.dialogRef.disableClose = true;
          setTimeout(() => {
            this.dialogRef.disableClose = false;
          });
        } else {
          this.unsavedChangesEvent.emit(false);
          this.dialogRef.close();
        }
      } else {
        this.dialogRef.close();
      }
    });
  }
  formStaff = this.fb.group({
    fullName: [this.data.fullName, Validators.required],
    email: [this.data.email, [Validators.required, Validators.email]],
    phoneNumber: [this.data.phoneNumber, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
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
    if(this.formStaff.valid) {
      this.staffService.addStaff(data).subscribe(data => {
        if (data) {
          this.toastr.success('Create staff successfully', "Success");
          this.dialogRef.close(true);
        }
      })
      this.unsavedChangesEvent.emit(false);
    }
  }
  updateStaff() {
    const managerId  = this.data.managerId;
    const data = {managerId, ...this.formStaff.value};
    this.staffService.adminUpdateStaffInfo(data).subscribe((data) => {
      if (data) {
        this.toastr.success('Update staff successfully', "Success");
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

  onCancel(): void {
    if (this.formStaff.dirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (confirm) {
        this.unsavedChangesEvent.emit(false);
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }

}

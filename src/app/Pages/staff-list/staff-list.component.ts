import { CommonModule } from '@angular/common';
import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {StaffService} from "../../core/service/staff.service";
import {DialogStaffListComponent} from "./dialog-staff-list/dialog-staff-list.component";
import {forkJoin, Subject, takeUntil} from "rxjs";
import {RoleService} from "../../core/service/role.service";

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})
export class StaffListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'phoneNumber', 'role', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private staffService: StaffService,
    private roleService: RoleService
  ) { }
  ngOnInit(): void {
    this.getStaffList()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getStaffList() {
    forkJoin(
      [
        this.staffService.getStaffList(),
        this.roleService.getRoleList(),
      ],
      (staffList, roleList) => {
        return {
          staffs: staffList,
          arrRole: roleList
        };
      }
    ).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe((data) => {
        const newData = data.staffs.arrayManager.map((staff: any) => {
          const found = data.arrRole.roles.find((role: any) => role.roleId === staff.roleId)
          return {
            ...staff,
            roleName: found ? found.roleName : null
          }
        })
        this.dataSource.data = [...newData];
      });
  }

  deleteStaff(id: number) {
    if(window.confirm('Are you sure you want to delete this staff?')) {
      this.staffService.deleteStaff(id).subscribe(res => {
        if(res) {
          this.getStaffList();
        }
      });
    } else return;
  }

  openDialogProduct(id?: number): void {
    const selectedItem = this.dataSource.data.find(staff => staff.managerId === id);
    let dialogRef;

    if (selectedItem) {
      dialogRef = this.dialog.open(DialogStaffListComponent, {
        data: {...selectedItem, isAdd: false},
      });
    } else {
      dialogRef = this.dialog.open(DialogStaffListComponent, {
        data: {
          productId: null,
          categoryId: null,
          productName: null,
          entryPrice: null,
          price: null,
          quantityStock: null,
          quantitySold: null,
          imageProduct: null,
          descProduct: null,
          dateAdded: null,
          isAdd: true
        }
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getStaffList();
      }
    });
  }
}

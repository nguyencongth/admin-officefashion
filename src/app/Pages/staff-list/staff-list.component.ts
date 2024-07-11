import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class StaffListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'phoneNumber', 'role', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private staffService: StaffService
  ) { }
  ngOnInit(): void {
    this.getStaffList()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getStaffList() {
    this.staffService.getStaffList().subscribe((res) => {
      if (res) {
        this.dataSource.data = res.arrayManager;
      }
    });
  }

  // openDialogProduct(id?: number): void {
  //   const selectedItem = this.dataSource.data.find(product => product.productId === id);
  //   let dialogRef;
  //
  //   if (selectedItem) {
  //     dialogRef = this.dialog.open(DialogProductComponent, {
  //       data: {...selectedItem, isAdd: false},
  //     });
  //   } else {
  //     dialogRef = this.dialog.open(DialogProductComponent, {
  //       data: {
  //         productId: null,
  //         categoryId: null,
  //         productName: null,
  //         entryPrice: null,
  //         price: null,
  //         quantityStock: null,
  //         quantitySold: null,
  //         imageProduct: null,
  //         descProduct: null,
  //         dateAdded: null,
  //         isAdd: true
  //       }
  //     });
  //   }
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.getData();
  //     }
  //   });
  // }
}

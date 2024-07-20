import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {UserService} from "../../core/service/user.service";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'phonenumber', 'address'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.getUserList()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getUserList() {
    this.userService.getUserList().subscribe((res) => {
      if(res) {
        this.dataSource.data = res.arrayCustomer;
      }
    })
  }
}

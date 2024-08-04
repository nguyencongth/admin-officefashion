import { Subject, forkJoin, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {ProductService} from "../../core/service/product.service";
import {CategoryService} from "../../core/service/category.service";
import {OrderService} from "../../core/service/order.service";
import {UserService} from "../../core/service/user.service";
import {CurrencyFormatPipe} from "../../core/pipes/currency-format.pipe";
import {DatetimeFormatPipe} from "../../core/pipes/datetime-format.pipe";
import {AuthService} from "../../core/service/auth.service";
import {DialogOrderDetailComponent} from "./dialog-order-detail/dialog-order-detail.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-list',
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
      MatDividerModule,
      CurrencyFormatPipe,
      DatetimeFormatPipe
    ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit, OnDestroy, AfterViewInit {
  selected = '';
  displayedColumns: string[] = ['id', 'customer', 'orderStatus', 'paymentMethod', 'orderDate', 'totalAmount', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private userService: UserService,
    private route: Router,
    public dialog: MatDialog,
    protected authService: AuthService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.getDataOrder()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getDataOrder() {
    forkJoin(
      [
        this.orderService.getOrderList(),
        this.userService.getUserList(),
      ],
      (orderList, userList) => {
        return {
          orders: orderList,
          users: userList
        };
      }
    ).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe((data) => {
        const newData = data.orders.arrayOrders.map((order: any) => {
          const foundUser = data.users.arrayCustomer.find((user: any) => user.customerId === order.customerId)
          return {
            ...order,
            ...(foundUser ? foundUser : {})
          }
        })
        this.dataSource.data = [...newData];
      });
  }

  openDialogOrderDetail(id: number): void {
    const selectedItem = this.dataSource.data.find(order => order.orderId === id);
    let dialogRef;

    if (selectedItem) {
      dialogRef = this.dialog.open(DialogOrderDetailComponent, {
        data: selectedItem
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDataOrder();
      }
    });
  }
  confirmOrder(orderId: number, status: number) {
    this.orderService.confirmOrder(orderId, status).subscribe((res) => {
      if(res) {
        this.toastr.success('Xác nhận đơn hàng thành công', 'Thành công');
        this.getDataOrder();
      }
    })
  }
  cancelOrder(orderId: number) {
    if(window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
      this.orderService.cancelOrder(orderId).subscribe((res) => {
        if(res) {
          this.toastr.success('Hủy đơn hàng thành công', 'Thành công');
          this.getDataOrder();
        }
      })
    } else return;
  }
  getOrderStatus(status: number): string {
    switch(status) {
      case 0:
        return 'Đang chờ xử lý';
      case 1:
        return 'Đã xác nhận';
      case 2:
        return 'Hoàn thành ';
      default:
        return 'Unknown status';
    }
  }
  getOrderStatusColor(orderStatus: number): string {
    switch (orderStatus) {
      case 0:
        return 'red';
      case 1:
        return 'blue';
      case 2:
        return 'green';
      default:
        return '';
    }
  }
}

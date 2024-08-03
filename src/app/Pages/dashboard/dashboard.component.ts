import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  Top5ProductBestSellingComponent
} from "../statistical/top5-product-best-selling/top5-product-best-selling.component";
import {MatIcon} from "@angular/material/icon";
import {ProductService} from "../../core/service/product.service";
import {NgClass, NgStyle} from "@angular/common";
import {OrderService} from "../../core/service/order.service";
import {UserService} from "../../core/service/user.service";
import {CurrencyFormatPipe} from "../../core/pipes/currency-format.pipe";
import {Subscription} from "rxjs";
import {
  TotalProductSoldMonthComponent
} from "../statistical/total-product-sold-month/total-product-sold-month.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressBarModule,
    Top5ProductBestSellingComponent,
    MatIcon,
    NgStyle,
    NgClass,
    CurrencyFormatPipe,
    TotalProductSoldMonthComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  columns: string[] = ['id', 'name', 'Popularity', 'Sales'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  private unsubscribe$ = new Subscription();
  totalProduct: number = 0;
  totalOrder: number = 0;
  totalUser: number = 0;
  totalRevenue: number = 0;
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.getTop5ProductBestSelling();
    this.getTotalProduct();
    this.getTotalOrder();
    this.getTotalUser();
    this.getTotalRevenue();
  }
  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }
  getTop5ProductBestSelling() {
    this.unsubscribe$.add(
      this.productService.top5ProductBestSelling().subscribe((res: any) => {
        this.dataSource.data = res.arrayProduct.map((product:any) => {
          let enterPrice = product.entryPrice;
          let price = product.price;
          let percentage = (price - enterPrice) / enterPrice * 100;
          product.profitPercentage = Math.round(percentage)
          return product;
        })
      })
    )
  }

  getProfitColor(profitPercentage: number): string {
    if (profitPercentage < 20) {
      return 'rgb(136, 77, 255)';
    } else if (profitPercentage >= 20 && profitPercentage < 50) {
      return 'rgb(255, 143, 13)';
    } else if (profitPercentage >= 50 && profitPercentage < 100) {
      return 'rgb(0, 149, 255)';
    } else {
      return 'rgb(0, 224, 150)';
    }
  }

  getTotalProduct() {
    this.unsubscribe$.add(
      this.productService.getProduct().subscribe((res: any) => {
        this.totalProduct = res.arrayProduct.length;
      })
    )
  }
  getTotalOrder() {
    this.unsubscribe$.add(
      this.orderService.getOrderList().subscribe((res: any) => {
        this.totalOrder = res.arrayOrders.length;
      })
    )
  }

  getTotalUser() {
    this.unsubscribe$.add(
      this.userService.getUserList().subscribe((res: any) => {
        this.totalUser = res.arrayCustomer.length;
      })
    )
  }

  getTotalRevenue() {
    this.unsubscribe$.add(
      this.productService.totalRevenueInMonth(new Date().getFullYear()).subscribe((res: any) =>{
        this.totalRevenue = res.arrayRevenue.reduce((acc:number, data: any) => {
          return acc + data.totalRevenue;
        }, 0);
      })
    )
  }
}

import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  Top5ProductBestSellingComponent
} from "../statistical/top5-product-best-selling/top5-product-best-selling.component";
import {MatIcon} from "@angular/material/icon";
import {ProductService} from "../../core/service/product.service";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressBarModule,
    Top5ProductBestSellingComponent,
    MatIcon,
    NgStyle,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  columns: string[] = ['id', 'name', 'Popularity', 'Sales'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  profitPercentage: number = 0;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.getTop5ProductBestSelling();
  }
  getTop5ProductBestSelling() {
    this.productService.top5ProductBestSelling().subscribe((res: any) => {
      this.dataSource.data = res.arrayProduct.map((product:any) => {
        let enterPrice = product.entryPrice;
        let price = product.price;
        let percentage = (price - enterPrice) / enterPrice * 100;
        console.log(enterPrice, price, percentage)
        product.profitPercentage = Math.round(percentage)
        return product;
      })
    });
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
}

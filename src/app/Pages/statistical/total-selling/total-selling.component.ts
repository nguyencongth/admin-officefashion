import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import {ProductService} from "../../../core/service/product.service";

@Component({
  selector: 'app-total-selling',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './total-selling.component.html',
  styleUrl: './total-selling.component.css'
})
export class TotalSellingComponent implements OnInit {
  totalNumberOfProductSold: any[] = [];
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Tổng số lượng bán được trong tháng',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getTotalNumberOfProductSoldInMonth();
  }

  getTotalNumberOfProductSoldInMonth() {
    this.productService.totalNumberOfProductSoldInMonth().subscribe((res: any) => {
      this.totalNumberOfProductSold = res.arraySalesData;
      this.lineChartData.labels = this.totalNumberOfProductSold.map((data:any) => `Tháng ${data.month}`);
      this.lineChartData.datasets[0].data = this.totalNumberOfProductSold.map((data:any) => data.totalQuantitySold);
    });
  }
}

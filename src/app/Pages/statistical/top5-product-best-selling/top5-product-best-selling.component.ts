import {Component, OnInit} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {ProductService} from "../../../core/service/product.service";

@Component({
  selector: 'app-top5-product-best-selling',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './top5-product-best-selling.component.html',
  styleUrl: './top5-product-best-selling.component.css'
})
export class Top5ProductBestSellingComponent implements OnInit {
  topProductsBestSelling: any[] = [];
  totalNumberOfProductSold: any[] = [];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels:any[] = [];
  public pieChartDatasets = [ {
    data: [] as number[],
  } ];
  public pieChartLegend = true;
  public pieChartPlugins:any[] = [];

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
  responsive: false
  };
  public lineChartLegend = true;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getTop5ProductBestSelling();
    // this.getTotalNumberOfProductSoldInMonth();
  }

  getTop5ProductBestSelling() {
    this.productService.top5ProductBestSelling().subscribe((res: any) => {
      this.topProductsBestSelling = res.arrayProduct;
      this.pieChartLabels = this.topProductsBestSelling.map(product => product.productName);
      this.pieChartDatasets = [
        {
          data: this.topProductsBestSelling.map(product => product.quantitySold),
        }
      ];
    });
  }
  // getTotalNumberOfProductSoldInMonth() {
  //   this.productService.totalNumberOfProductSoldInMonth().subscribe((res: any) => {
  //     this.totalNumberOfProductSold = res.arraySalesData;
  //     this.lineChartData.labels = this.totalNumberOfProductSold.map((data:any) => `Tháng ${data.month}`);
  //     this.lineChartData.datasets[0].data = this.totalNumberOfProductSold.map((data:any) => data.totalQuantitySold);
  //   });
  // }
}

import {Component, OnInit} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {ChartOptions} from "chart.js";
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
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels:any[] = [];
  public pieChartDatasets = [ {
    data: [] as number[],
  } ];
  public pieChartLegend = true;
  public pieChartPlugins:any[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getTop5ProductBestSelling();
    console.log(this.topProductsBestSelling);
    console.log(this.pieChartLabels);
    console.log(this.pieChartDatasets);
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
}

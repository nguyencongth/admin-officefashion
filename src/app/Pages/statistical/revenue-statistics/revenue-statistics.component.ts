import {Component, OnInit} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ProductService} from "../../../core/service/product.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-revenue-statistics',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './revenue-statistics.component.html',
  styleUrl: './revenue-statistics.component.css'
})
export class RevenueStatisticsComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins: any[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: '2024' },
      { data: [], label: '2023' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  monthYearControl = new FormControl(new Date());

  constructor(
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getTotalRevenueInMonth(this.monthYearControl.value.getFullYear());
    this.monthYearControl.valueChanges.subscribe((value) => {
      if (value) {
        this.getTotalRevenueInMonth(value.getFullYear());
      }
    });
  }
  chosenYearHandler(normalizedYear: Date) {
    const ctrlValue = this.monthYearControl.value;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.monthYearControl.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.monthYearControl.value;
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.monthYearControl.setValue(ctrlValue);
    datepicker.close();
  }

  getTotalRevenueInMonth(year: number) {
    this.productService.totalRevenueInMonth(year).subscribe((res: any) => {
      const currentYearData = res.arrayRevenue.map((data: any) => data.totalRevenue);
      const labels = res.arrayRevenue.map((data: any) => `Tháng ${data.month}`);

      this.productService.totalRevenueInMonth(year - 1).subscribe((resPrev: any) => {
        const previousYearData = resPrev.arrayRevenue.map((data: any) => data.totalRevenue);

        this.barChartData = {
          labels: labels,
          datasets: [
            { data: currentYearData, label: `${year}` },
            { data: previousYearData, label: `${year - 1}` }
          ]
        };
      });
    });
  }
}

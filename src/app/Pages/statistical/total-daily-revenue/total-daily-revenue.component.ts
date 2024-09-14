import {Component, OnInit} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {ProductService} from "../../../core/service/product.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-total-daily-revenue',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf
  ],
  templateUrl: './total-daily-revenue.component.html',
  styleUrl: './total-daily-revenue.component.css'
})
export class TotalDailyRevenueComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins: any[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: '2024' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  getCurrentWeek() {
    const currentDay = new Date().getDate();
    console.log(currentDay)
    return Math.ceil(currentDay / 7);
  }

  monthYearControl = new FormControl(new Date());
  weekControl = new FormControl(this.getCurrentWeek());

  constructor(
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getTotalDailyRevenue(this.monthYearControl.value.getFullYear(), this.monthYearControl.value.getMonth() + 1, this.weekControl.value);
    this.monthYearControl.valueChanges.subscribe((value) => {
      if (value) {
        this.getTotalDailyRevenue(value.getFullYear(), value.getMonth() + 1, this.weekControl.value);
      }
    });

    this.weekControl.valueChanges.subscribe((value) => {
      if (value) {
        this.getTotalDailyRevenue(this.monthYearControl.value.getFullYear(), this.monthYearControl.value.getMonth() + 1, value);
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

  onWeekChange(event: any) {
    this.weekControl.setValue(event.value);
    console.log('Selected week: ', this.weekControl.value);
  }

  getTotalDailyRevenue(year: number, month: number, week: number) {
    this.productService.totalDailyRevenue(year, month, week).subscribe((res: any) => {
      const currentYearData = res.arrayRevenue.map((data: any) => data.totalRevenue);
      const labels = res.arrayRevenue.map((data: any) => `${new Date(data.date).toLocaleDateString()}`);

      this.barChartData = {
        labels: labels,
        datasets: [
          { data: currentYearData, label: `${year}` },
        ]
      };
    });
  }
}

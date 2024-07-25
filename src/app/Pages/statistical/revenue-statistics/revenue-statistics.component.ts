import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-revenue-statistics',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './revenue-statistics.component.html',
  styleUrl: './revenue-statistics.component.css'
})
export class RevenueStatisticsComponent {
  public barChartLegend = true;
  public barChartPlugins: any[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: '2024' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: '2023' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() {
  }
}

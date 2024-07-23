import { Component } from '@angular/core';
import {
  Top5ProductBestSellingComponent
} from "../statistical/top5-product-best-selling/top5-product-best-selling.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Top5ProductBestSellingComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

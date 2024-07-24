import { Component } from '@angular/core';
import {
  Top5ProductBestSellingComponent
} from "../statistical/top5-product-best-selling/top5-product-best-selling.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        Top5ProductBestSellingComponent,
        MatIcon
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

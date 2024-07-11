import {Routes} from "@angular/router";
import {DashboardComponent} from "../../Pages/dashboard/dashboard.component";
import {ProductComponent} from "../../Pages/product/product.component";
import {OrderListComponent} from "../../Pages/order-list/order-list.component";


export const SIDENAV_ROUTER: Routes = [
  { path: 'dashboard',component: DashboardComponent , title: 'Dashboard' },
  { path: 'products', component: ProductComponent, title: 'Products' },
  { path: 'orders', component: OrderListComponent, title: 'Orders' }
]

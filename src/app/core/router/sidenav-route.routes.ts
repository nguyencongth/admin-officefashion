import {Routes} from "@angular/router";
import {DashboardComponent} from "../../Pages/dashboard/dashboard.component";
import {ProductComponent} from "../../Pages/product/product.component";
import {OrderListComponent} from "../../Pages/order-list/order-list.component";
import {StaffListComponent} from "../../Pages/staff-list/staff-list.component";
import {UserListComponent} from "../../Pages/user-list/user-list.component";
import {CategoryListComponent} from "../../Pages/category-list/category-list.component";


export const SIDENAV_ROUTER: Routes = [
  { path: 'dashboard',component: DashboardComponent , title: 'Dashboard' },
  { path: 'products', component: ProductComponent, title: 'Products' },
  { path: 'orders', component: OrderListComponent, title: 'Orders' },
  { path: 'staff-list', component: StaffListComponent, title: 'Staff list' },
  { path: 'user-list', component: UserListComponent, title: 'User list' },
  { path: 'category-list', component: CategoryListComponent, title: 'Category list' },
]

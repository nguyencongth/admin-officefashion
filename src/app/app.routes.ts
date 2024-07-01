import { Routes } from '@angular/router';
import {SidenavComponent} from "./Pages/sidenav/sidenav.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', title: 'Dashboard' },
  { path: 'login',
    loadComponent: () => import('./Pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: '',
    component: SidenavComponent,
    //canActivate: [authGuard],
    loadChildren: () => import('./core/router/sidenav-route.routes').then(m => m.SIDENAV_ROUTER),
  }
];

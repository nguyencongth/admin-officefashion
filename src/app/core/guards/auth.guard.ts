import {CanActivateFn, CanDeactivate, CanDeactivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    const isLoggedIn = !!localStorage.getItem('loggedIn');
    return isLoggedIn ? true : this.router.navigate(['/login']);
  }
}
  export const authGuard: CanActivateFn = (route, state) => {
    return inject(PermissionsService).canActivate();
  };

  export interface CanComponentDeactivate {
    canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
  }

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};

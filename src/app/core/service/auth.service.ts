import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private role: string | null = null;
  private email: string | null = null;
  private apiUrl = environment.api.urlLogin;
  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn == !!localStorage.getItem('loggedIn');
  }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    }
    return this.http.post(this.apiUrl, loginData).pipe(
      map((data: any) => {
        if(data.statusCode === 200) {
          this.loggedIn = true;
          this.role = data.role;
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem("email", email);
          localStorage.setItem('role', <string>this.role);
          localStorage.setItem('managerId', data.managerId);
          return true;
        }
        return false;
      })
    );
  }
  getRole() {
    if(!this.role) {
      this.role = localStorage.getItem('role');
    }
    return this.role;
  }
  getInfo() {
    this.email = localStorage.getItem('email');
    return this.email;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('managerId');
    localStorage.removeItem('role');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

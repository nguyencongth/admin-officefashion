import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = environment.api.urlManager;
  constructor(private http: HttpClient) { }

  getStaffList():Observable<any> {
    const url = `${this.apiUrl}/getStaffAll`;
    return this.http.get(url);
  }

  getStaffById(id:number):Observable<any> {
    const url = `${this.apiUrl}/getStaffById?managerId=${id}`;
    return this.http.get(url);
  }

  addStaff(data: any):Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, data);
  }

  updateStaffInfo(data: any):Observable<any> {
    const url = `${this.apiUrl}/updateInfoStaff`;
    return this.http.patch(url, data);
  }

  deleteStaff(id:number):Observable<any> {
    const url = `${this.apiUrl}/deleteStaff?managerId=${id}`;
    return this.http.delete(url);
  }
}

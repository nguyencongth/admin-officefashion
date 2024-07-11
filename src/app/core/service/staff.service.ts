import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = environment.api.urlManager;
  constructor(private Http: HttpClient) { }

  getStaffList():Observable<any> {
    const url = `${this.apiUrl}/getStaffAll`;
    return this.Http.get(url);
  }
}

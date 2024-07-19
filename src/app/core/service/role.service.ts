import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.api.urlRole;
  constructor(private http: HttpClient) { }

  getRoleList(): Observable<any> {
    const url = `${this.apiUrl}/getRoles`;
    return this.http.get(url);
  }
}

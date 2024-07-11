import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.api.urlUser;
  constructor(private Http: HttpClient) { }

  getUserList():Observable<any> {
    const url = `${this.apiUrl}/customerAll`;
    return this.Http.get(url);
  }
}

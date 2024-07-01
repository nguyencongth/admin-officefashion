import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct():Observable<any> {
    const url = `${environment.api.urlProduct}/getProductAdmin`;
    return this.http.get(url);
  }
}

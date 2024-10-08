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

  addNewProduct(data: any):Observable<any> {
    const url = `${environment.api.urlProduct}/addNewProduct`;
    return this.http.post(url, data);
  }

  updateProduct(data: any):Observable<any> {
    const url = `${environment.api.urlProduct}/updateInfoProduct`;
    return this.http.patch(url, data);
  }

  deleteProduct(id: number):Observable<any> {
    const url = `${environment.api.urlProduct}/deleteProduct?productId=${id}`;
    return this.http.delete(url);
  }

  top5ProductBestSelling():Observable<any> {
    const url = `${environment.api.urlProduct}/top5ProductsBestSelling`;
    return this.http.get(url);
  }
  totalNumberOfProductSoldInMonth():Observable<any> {
    const url = `${environment.api.urlProduct}/totalNumberOfProductSold`;
    return this.http.get(url);
  }
  totalRevenueInMonth(year: number):Observable<any> {
    const url = `${environment.api.urlProduct}/totalRevenueInMonth?year=${year}`;
    return this.http.get(url);
  }
  totalDailyRevenue(year: number, month: number, week: number):Observable<any> {
    const url = `${environment.api.urlProduct}/totalDailyRevenue?year=${year}&month=${month}&week=${week}`;
    return this.http.get(url);
  }
}

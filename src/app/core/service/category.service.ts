import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlApi = environment.api.urlCategory;
  constructor(private http: HttpClient) { }

  getCategory():Observable<any> {
    const url = `${this.urlApi}/getProductType`;
    return this.http.get(url);
  }
  getCategoryById(categoryId: number):Observable<any> {
    const url = `${this.urlApi}/getCategoryById?categoryId=${categoryId}`;
    return this.http.get(url);
  }

  createCategory(category: any):Observable<any> {
    const url = `${this.urlApi}/addCategory`;
    return this.http.post(url, category);
  }

  updateCategory(data: any):Observable<any> {
    const url = `${this.urlApi}/updateCategory`;
    return this.http.patch(url, data);
  }
  deleteCategory(categoryId: number):Observable<any> {
    const url = `${this.urlApi}/deleteCategory?categoryId=${categoryId}`;
    return this.http.delete(url);
  }
}

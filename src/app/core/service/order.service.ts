import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.api.urlOrder;
  constructor(private Http: HttpClient) { }

  getOrderList():Observable<any> {
    const url = `${this.apiUrl}/getAllOrder`;
    return this.Http.get(url);
  }
  confirmOrder(orderId: number, status: number):Observable<any> {
    const url = `${this.apiUrl}/updateOrderStatus?orderId=${orderId}&newOrderStatus=${status}`;
    return this.Http.patch(url, {});
  }
  cancelOrder(orderId: number):Observable<any> {
    const url = `${this.apiUrl}/deleteOrder?orderID=${orderId}`;
    return this.Http.delete(url);
  }
}

// src/app/orderdetails/orderdetailsservice.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from './orderdetail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = 'https://localhost:7234/api/OrderDetails';

  constructor(private http: HttpClient) {}

  getByOrder(orderId: number): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.apiUrl}/order/${orderId}`);
  }

  create(orderId: number, detail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${this.apiUrl}/add/${orderId}`, detail);
  }

  update(detail: OrderDetail): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}/${detail.orderDetailId}`, detail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

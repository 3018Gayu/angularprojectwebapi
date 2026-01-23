import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order.model';
import { CreateOrder } from './create-order.model';
import { UpdateOrder } from './update-order.model';

@Injectable({
  providedIn: 'root'
})
export class Orderservice {
  private apiUrl = 'https://localhost:7234/api/Orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  create(order: CreateOrder): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  update(orderId: number, order: UpdateOrder): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, order);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
}

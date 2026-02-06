import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTransaction, InventoryTransaction, UpdateTransaction } from './inventory-transactions-module';

@Injectable({
  providedIn: 'root'
})
export class InventoryTransactionService {
  private apiUrl = 'https://localhost:7234/api/InventoryTransactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<InventoryTransaction[]> {
    return this.http.get<InventoryTransaction[]>(this.apiUrl);
  }

  getById(id: number): Observable<InventoryTransaction> {
    return this.http.get<InventoryTransaction>(`${this.apiUrl}/${id}`);
  }

  create(transaction: CreateTransaction): Observable<any> {
    return this.http.post(this.apiUrl, transaction);
  }

  update(id: number, transaction: UpdateTransaction): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, transaction);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

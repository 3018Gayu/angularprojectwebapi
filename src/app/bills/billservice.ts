import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from './bill.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillService {
  private apiUrl = 'https://localhost:7234/api/Bill'; // replace with your API

  constructor(private http: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }

  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }

  createBill(bill: Bill): Observable<any> {
    return this.http.post(this.apiUrl, bill);
  }

  updateBill(id: number, bill: Bill): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

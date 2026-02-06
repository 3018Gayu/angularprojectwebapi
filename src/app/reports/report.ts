import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';
import { DailySale } from './models/daily-sale';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'https://localhost:7234/api/Reports';

  constructor(private http: HttpClient) {}

  /** Get JWT token from localStorage */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // ✅ must match login storage key
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // ----------------- Customers -----------------
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`, {
      headers: this.getAuthHeaders()
    });
  }

  downloadCustomersPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/customers/pdf`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    });
  }

  // ----------------- Daily Sales -----------------
  getDailySales(date?: string): Observable<DailySale[]> {
    return this.http.get<DailySale[]>(`${this.apiUrl}/daily-sales`, { 
      headers: this.getAuthHeaders(),
      params: { date: date || '' } 
    });
  }

  downloadDailySalesPdf(date?: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/daily-sales/pdf`, { 
      headers: this.getAuthHeaders(),
      params: { date: date || '' },
      responseType: 'blob' 
    });
  }

  // ----------------- Monthly Sales -----------------
  getMonthlySales(month?: number, year?: number, categoryId?: number): Observable<DailySale[]> {
    const params: any = {};
    if (month) params.month = month;
    if (year) params.year = year;
    if (categoryId) params.categoryId = categoryId;
    return this.http.get<DailySale[]>(`${this.apiUrl}/monthly-sales`, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  downloadMonthlySalesPdf(month?: number, year?: number, categoryId?: number): Observable<Blob> {
    const params: any = {};
    if (month) params.month = month;
    if (year) params.year = year;
    if (categoryId) params.categoryId = categoryId;
    return this.http.get(`${this.apiUrl}/monthly-sales/pdf`, {
      headers: this.getAuthHeaders(),
      params,
      responseType: 'blob'
    });
  }

  // ----------------- Weekly Sales -----------------
  getWeeklySales(startDate: string, endDate: string): Observable<DailySale[]> {
    return this.http.get<DailySale[]>(`${this.apiUrl}/weekly-sales`, { 
      headers: this.getAuthHeaders(),
      params: { startDate, endDate } 
    });
  }

  downloadWeeklySalesPdf(startDate: string, endDate: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/weekly-sales/pdf`, { 
      headers: this.getAuthHeaders(),
      params: { startDate, endDate },
      responseType: 'blob' 
    });
  }
}

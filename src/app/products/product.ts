import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://localhost:7234/api/Products';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`,
        'Content-Type': 'application/json'
      })
    };
  }

  // All products (for table)
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl, this.headers());
  }

  // Active products only (for dropdown)
  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/active`, this.headers());
  }

  create(p: Product): Observable<void> {
    return this.http.post<void>(this.baseUrl, this.toDto(p), this.headers());
  }

  update(id: number, p: Product): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, this.toDto(p), this.headers());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.headers());
  }

  private toDto(p: Product) {
    return {
      name: p.name,
      categoryId: p.categoryId,
      unitPrice: p.unitPrice,
      stockQty: p.stockQty,
      expiryDate: p.expiryDate,
      isActive: p.isActive
    };
  }
}

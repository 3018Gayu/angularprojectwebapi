import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'https://localhost:7234/api/Categories';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  create(category: Category) {
    return this.http.post<Category>(this.apiUrl, category);
  }

  update(id: number, category: Category) {
    return this.http.put<void>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from './dashboard';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = 'https://localhost:7234/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<Dashboard> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Dashboard>(this.apiUrl, { headers });
  }
}

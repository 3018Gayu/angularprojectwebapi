
 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'https://localhost:7234/api/account'; 

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<User> {
    return new Observable(observer => {
      this.http.post<User>(`${this.baseUrl}/login`, credentials).subscribe({
        next: (user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          observer.next(user);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  forgotPassword(data: { email: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
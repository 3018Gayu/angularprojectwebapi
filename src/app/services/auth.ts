import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Get the user's role from local storage
  get role(): string | null {
    return localStorage.getItem('role');
  }

  // Get the user's name from local storage
  get name(): string | null {
    return localStorage.getItem('name');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken(); // safer: check token instead of role
  }

  // Role checks
  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  isCashier(): boolean {
    return this.role === 'Cashier';
  }

  isInventory(): boolean {
    return this.role === 'InventoryManager';
  }

  // Get the stored JWT token
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  // Logout the user
  logout(): void {
    localStorage.clear();
  }
}

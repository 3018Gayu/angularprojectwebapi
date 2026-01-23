import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Needed for *ngIf, *ngFor

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Supermarket</a>
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="/categories">Categories</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/products">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/customers">Customers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/orders">Orders</a>
          </li>
        </ul>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

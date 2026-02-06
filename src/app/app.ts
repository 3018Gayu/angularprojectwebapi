import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">Saksoftsupermarket</a>

        <ul class="navbar-nav me-auto">

          <!-- LOGGED IN -->
          <ng-container *ngIf="auth.isLoggedIn(); else guestMenu">

            <!-- ADMIN -->
            <ng-container *ngIf="auth.isAdmin()">
              <li class="nav-item">
                <a class="nav-link" routerLink="/dashboard">Dashboard</a>
              </li>

              

              <!-- REPORTS DROPDOWN (FIXED) -->
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Reports
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" routerLink="/reports/customers">
                      Customer Report
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" routerLink="/reports/daily-sales">
                      Daily Sales Report
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" routerLink="/reports/weekly-sales">
                      Weekly Sales Report
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" routerLink="/reports/monthly-sales">
                      Monthly Sales Report
                    </a>
                  </li>
                </ul>
              </li>
               <li class="nav-item">
            <a class="nav-link" routerLink="/users">Users</a> <!-- ✅ Only Admin -->
          </li>
              
            </ng-container>

            <!-- INVENTORY ROLE -->
            <ng-container *ngIf="auth.isInventory()">
              <li class="nav-item">
                <a class="nav-link" routerLink="/dashboard">Dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/products">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/inventory-transactions">Inventory</a>
              </li>
            </ng-container>

            <!-- CASHIER ROLE -->
            <ng-container *ngIf="auth.isCashier()">
              <li class="nav-item">
                <a class="nav-link" routerLink="/dashboard">Dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/customers">Customers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/bills">Billing</a>
              </li>
            </ng-container>

          </ng-container>

          <!-- GUEST -->
          <ng-template #guestMenu>
            <li class="nav-item">
              <a class="nav-link" routerLink="/account/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/account/register">Register</a>
            </li>
          </ng-template>

        </ul>

<!-- RIGHT SIDE -->
<ul class="navbar-nav ms-auto" *ngIf="auth.isLoggedIn()">
  <li class="nav-item d-flex align-items-center me-3">
    <span class="badge rounded-pill bg-light text-primary px-3 py-2 shadow-sm">
      <i class="fas fa-user me-1"></i> {{ auth.name }} ({{ auth.role }})
    </span>
  </li>
  <li class="nav-item">
    <a class="nav-link" (click)="logout()">Logout</a>
  </li>
</ul>


      </div>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/account/login']);
  }
}

import { Routes } from '@angular/router';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard/dashboard';

// Customers
import { CustomerListComponent } from './customers/customer-list/customer-list';
import { CustomerFormComponent } from './customers/customer-form/customer-form';

// Products
import { ProductListComponent } from './products/product-list/product-list';

// Orders
import { OrderListComponent } from './orders/order-list/order-list';
import { OrderFormComponent } from './orders/order-form/order-form';

// Inventory Transactions
import { TransactionListComponent } from './inventory-transactions/transaction-list/transaction-list';
import { TransactionFormComponent } from './inventory-transactions/transaction-form/transaction-form';

// Bills
import { BillListComponent } from './bills/bill-list/bill-list';
import { BillFormComponent } from './bills/bill-form/bill-form';

// Suppliers
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list';
import { SupplierFormComponent } from './suppliers/supplier-form/supplier-form';

// Reports
import { CustomerReportComponent } from './reports/customer-report/customer-report';
import { DailySalesReportComponent } from './reports/daily-sales-report/daily-sales-report';
import { WeeklySalesReportComponent } from './reports/weekly-sales-report/weekly-sales-report';
import { MonthlySalesReportComponent } from './reports/monthly-sales-report/monthly-sales-report';

// Account
import { LoginComponent } from './account/login/login';
import { RegisterComponent } from './account/register/register';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password';
import { WelcomeComponent } from './account/welcome/welcome';

// Users
import { UsersComponent } from './users/users';

// Categories
import { CategoryListComponent } from './categories/category-list/category-list';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Dashboard
  { path: 'dashboard', component: DashboardComponent },

  // Categories
  { path: 'categories', component: CategoryListComponent },

  // Products
  { path: 'products', component: ProductListComponent },

  // Customers
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },

  // Orders
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },

  // Inventory Transactions
  { path: 'inventory-transactions', component: TransactionListComponent },
  { path: 'inventory-transactions/new', component: TransactionFormComponent },
  { path: 'inventory-transactions/edit/:id', component: TransactionFormComponent }, // <-- edit route fixed

  // Bills
  { path: 'bills', component: BillListComponent },
  { path: 'bills/new', component: BillFormComponent },
  { path: 'bills/edit/:id', component: BillFormComponent },

  // Suppliers
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'suppliers/new', component: SupplierFormComponent },
  { path: 'suppliers/edit/:id', component: SupplierFormComponent },

  // Reports
  { path: 'reports/customers', component: CustomerReportComponent },
  { path: 'reports/daily-sales', component: DailySalesReportComponent },
  { path: 'reports/weekly-sales', component: WeeklySalesReportComponent },
  { path: 'reports/monthly-sales', component: MonthlySalesReportComponent },

  // Users
  { path: 'users', component: UsersComponent },

  // Account
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/forgot-password', component: ForgotPasswordComponent },
  { path: 'account/welcome', component: WelcomeComponent },

  // Wildcard redirect
  { path: '**', redirectTo: 'dashboard' }
];

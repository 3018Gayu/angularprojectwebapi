import { Routes } from '@angular/router';
import { CategoryListComponent } from './categories/category-list/category-list';
import { ProductListComponent } from './products/product-list/product-list';
import { CustomerListComponent } from './customers/customer-list/customer-list';
import { CustomerFormComponent } from './customers/customer-form/customer-form';
import { OrderListComponent } from './orders/order-list/order-list';
import { OrderFormComponent } from './orders/order-form/order-form';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },
  { path: '**', redirectTo: 'categories' }
];

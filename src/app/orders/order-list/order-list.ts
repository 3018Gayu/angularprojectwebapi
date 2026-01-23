// src/app/orders/order-list/order-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Orderservice } from '../orderservice';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error: string = '';

  constructor(private orderService: Orderservice) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  deleteOrder(id: number): void {
    if (!confirm('Are you sure you want to delete this order?')) return;
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o.orderId !== id);
      },
      error: () => {
        this.error = 'Failed to delete order';
      }
    });
  }
}

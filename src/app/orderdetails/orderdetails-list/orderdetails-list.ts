// src/app/orderdetails/orderdetails-list/orderdetails-list.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { OrderDetailsService } from '../orderdetailsservice';
import { OrderDetail } from '../orderdetail.model';

@Component({
  selector: 'app-orderdetails-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './orderdetails-list.html',
  styleUrls: ['./orderdetails-list.css']
})
export class OrderdetailsList implements OnInit {
  @Input() orderId!: number;
  orderDetails: OrderDetail[] = [];
  error: string = '';

  constructor(private service: OrderDetailsService) {}

  ngOnInit(): void {
    this.service.getByOrder(this.orderId).subscribe({
      next: (data) => this.orderDetails = data,
      error: () => this.error = 'Failed to load order details'
    });
  }

  deleteDetail(id: number): void {
    if (!confirm('Delete this detail?')) return;
    this.service.delete(id).subscribe({
      next: () => {
        this.orderDetails = this.orderDetails.filter(d => d.orderDetailId !== id);
      },
      error: () => this.error = 'Failed to delete detail'
    });
  }
}

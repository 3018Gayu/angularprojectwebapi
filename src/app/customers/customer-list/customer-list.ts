import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CustomerService } from '../customerservice';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(data => this.customers = data);
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id)
        .subscribe(() => this.loadCustomers());
    }
  }

  // Navigate to add form
  addCustomer(): void {
    this.router.navigate(['/customers/new']);
  }

  // Navigate to edit form
  editCustomer(id: number): void {
    this.router.navigate(['/customers/edit', id]);
  }
}

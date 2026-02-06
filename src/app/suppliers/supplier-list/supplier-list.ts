import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Supplier } from '../suppliers-module';
import { SupplierService } from '../supplier';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-list.html',
  styleUrls: ['./supplier-list.css']
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];

  constructor(private supplierService: SupplierService, private router: Router) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: data => this.suppliers = data,
      error: err => console.error('Failed to load suppliers', err)
    });
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => this.loadSuppliers(),
        error: err => console.error('Delete failed', err)
      });
    }
  }

  editSupplier(id: number): void {
    this.router.navigate(['/suppliers/edit', id]);
  }

  addSupplier(): void {
    this.router.navigate(['/suppliers/add']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../supplier';
import { Supplier } from '../suppliers-module';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier-form.html',
  styleUrls: ['./supplier-form.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  supplierId?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get ID from route (if editing)
    this.supplierId = +this.route.snapshot.params['id'];
    this.isEdit = !!this.supplierId;

    // Initialize form
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required]
    });

    if (this.isEdit) {
      // Load supplier for editing
      this.supplierService.getSupplier(this.supplierId!).subscribe({
        next: supplier => this.supplierForm.patchValue(supplier),
        error: err => console.error('Failed to load supplier', err)
      });
    }
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    // Include supplierId for edit
    const supplier: Supplier = {
      ...this.supplierForm.value,
      supplierId: this.supplierId ?? 0
    };

    if (this.isEdit) {
      this.supplierService.updateSupplier(this.supplierId!, supplier).subscribe({
        next: () => this.router.navigate(['/suppliers']),
        error: err => console.error('Update failed', err)
      });
    } else {
      this.supplierService.createSupplier(supplier).subscribe({
        next: () => this.router.navigate(['/suppliers']),
        error: err => console.error('Create failed', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/suppliers']);
  }
}

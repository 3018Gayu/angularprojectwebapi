// src/app/orderdetails/orderdetails-form/orderdetails-form.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDetailsService } from '../orderdetailsservice';
@Component({
  selector: 'app-orderdetails-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orderdetails-form.html',
  styleUrls: ['./orderdetails-form.css']
})
export class OrderdetailsForm {
  form: FormGroup;
  products: any[] = []; // replace with Product[] if available
  error: string = '';
  success: string = '';

  constructor(private fb: FormBuilder, private service: OrderDetailsService) {
    this.form = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, Validators.required],
      unitPrice: [0, Validators.required],
      totalPrice: [0]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.service.create(1, this.form.value).subscribe({ // replace 1 with actual orderId
      next: () => {
        this.success = 'Detail saved';
        this.error = '';
      },
      error: () => {
        this.error = 'Failed to save';
        this.success = '';
      }
    });
  }
}

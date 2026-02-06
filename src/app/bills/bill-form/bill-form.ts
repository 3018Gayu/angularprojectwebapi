import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { BillService } from '../billservice';
import { Customer } from '../../customers/customer';
import { Product } from '../../products/product.model';
import { CustomerService } from '../../customers/customerservice';
import { ProductService } from '../../products/product';

@Component({
  selector: 'app-bill-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './bill-form.html'
})
export class BillFormComponent implements OnInit {

  products: Product[] = [];
  customers: Customer[] = [];
  selectedCustomer?: Customer;

  subtotal = 0;
  loyaltyDiscount = 0;
  totalAmount = 0;

  loyaltyApplied = false;

  billForm: FormGroup;
  isEditMode = false;
  billId?: number;

  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private productService: ProductService,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.billForm = this.fb.group({
      billDate: [new Date().toISOString().substring(0, 16)],
      customerId: [0],
      discountPercent: [0],
      discountAmount: [0],
      totalAmount: [0],
      billItems: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadInitialData();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.billId = +id;
        this.loadBill(this.billId);
      } else {
        this.addItem();
      }
    });
  }

  // ---------- SAFE ROUNDING ----------
  round2(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  // ---------- LOAD DATA ----------
  loadInitialData(): void {
    this.productService.getAll().subscribe(p =>
      this.products = p.filter(x => x.isActive)
    );

    this.customerService.getCustomers().subscribe(c =>
      this.customers = c
    );
  }

  loadBill(id: number): void {
    this.billService.getBill(id).subscribe(bill => {
      this.billForm.patchValue({
        billDate: bill.billDate,
        customerId: bill.customerId ?? 0,
        discountPercent: bill.discountPercent ?? 0
      });

      this.billItems.clear();
      bill.billItems.forEach(item => {
        this.billItems.push(this.fb.group({
          productId: [item.productId, Validators.required],
          quantity: [item.quantity, [Validators.required, Validators.min(1)]],
          unitPrice: [item.unitPrice],
          lineTotal: [item.lineTotal]
        }));
      });

      this.onCustomerChange();
      this.calculateTotals();
    });
  }

  // ---------- FORM ARRAY ----------
  get billItems(): FormArray {
    return this.billForm.get('billItems') as FormArray;
  }

  addItem(): void {
    this.billItems.push(
      this.fb.group({
        productId: [null, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        unitPrice: [0],
        lineTotal: [0]
      })
    );
  }

  removeItem(index: number): void {
    this.billItems.removeAt(index);
    this.calculateTotals();
  }

  // ---------- PRODUCT CHANGE ----------
  onProductChange(index: number): void {
    const row = this.billItems.at(index);
    const productId = +row.value.productId;
    const product = this.products.find(p => p.productId === productId);
    if (!product) return;

    row.patchValue({
      unitPrice: product.unitPrice,
      quantity: 1
    });

    this.calculateTotals();
  }

  // ---------- CUSTOMER CHANGE ----------
  onCustomerChange(): void {
    const customerId = +this.billForm.value.customerId;
    this.selectedCustomer =
      customerId !== 0
        ? this.customers.find(c => c.customerId === customerId)
        : undefined;

    this.calculateTotals();
  }

  // ---------- TOTALS ----------
  calculateTotals(): void {
    this.subtotal = 0;

    this.billItems.controls.forEach(row => {
      const qty = row.value.quantity || 0;
      const price = row.value.unitPrice || 0;

      const lineTotal = this.round2(qty * price);
      row.patchValue({ lineTotal }, { emitEvent: false });

      this.subtotal += lineTotal;
    });

    this.subtotal = this.round2(this.subtotal);

    // Loyalty discount: ₹5 for 10 points
    this.loyaltyDiscount = this.loyaltyApplied ? 5 : 0;

    const discountPercent = this.billForm.value.discountPercent || 0;
    const discountAmount = this.round2(
      (this.subtotal * discountPercent) / 100
    );

    this.totalAmount = this.round2(
      this.subtotal - discountAmount - this.loyaltyDiscount
    );

    this.billForm.patchValue({
      discountAmount,
      totalAmount: this.totalAmount
    }, { emitEvent: false });
  }

  // ---------- APPLY LOYALTY ----------
  applyLoyaltyDiscount(): void {
    if (!this.selectedCustomer) {
      alert('Select registered customer');
      return;
    }

    if (this.selectedCustomer.loyaltyPoints < 10) {
      alert('Minimum 10 loyalty points required');
      return;
    }

    this.selectedCustomer.loyaltyPoints -= 10;
    this.loyaltyApplied = true;

    this.customerService.updateCustomer(
      this.selectedCustomer.customerId,
      this.selectedCustomer
    ).subscribe();

    this.calculateTotals();
  }

  // ---------- SAVE ----------
  save(): void {
    if (this.billForm.invalid || this.billItems.length === 0) {
      alert('Please add items');
      return;
    }

    // Earn points: 1 point per ₹10 spent
    if (this.selectedCustomer) {
      const pointsEarned = Math.floor(this.totalAmount / 10);
      this.selectedCustomer.loyaltyPoints += pointsEarned;

      this.customerService.updateCustomer(
        this.selectedCustomer.customerId,
        this.selectedCustomer
      ).subscribe();
    }

    if (this.isEditMode && this.billId) {
      this.billService.updateBill(this.billId, this.billForm.value)
        .subscribe(() => this.router.navigate(['/bills']));
    } else {
      this.billService.createBill(this.billForm.value)
        .subscribe(() => this.router.navigate(['/bills']));
    }
  }

  goBack(): void {
    this.router.navigate(['/bills']);
  }
}

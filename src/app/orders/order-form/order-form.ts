import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Customer } from '../../customers/customer';
import { Product } from '../../products/product.model';
import { CustomerService } from '../../customers/customerservice';
import { ProductService } from '../../products/product';
import { Orderservice } from '../orderservice';
import { CreateOrder } from '../create-order.model';
import { UpdateOrder } from '../update-order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './order-form.html',
  styleUrls: ['./order-form.css']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  customers: Customer[] = [];
  products: Product[] = [];
  error: string = '';
  success: string = '';
  isEditMode: boolean = false;
  orderId?: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: Orderservice,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      invoiceNo: [{ value: '', disabled: false }, Validators.required],
      customerId: [null, Validators.required],
      orderDate: [new Date(), Validators.required],
      orderDetails: this.fb.array([]),
      totalAmount: [0],
      taxAmount: [0],
      discount: [0],
      netAmount: [0]
    });

    this.loadCustomers();
    this.loadProducts();

    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      this.isEditMode = true;
      this.orderForm.get('invoiceNo')?.disable(); // disable invoice number during edit
      this.loadOrder(this.orderId);
    }
  }

  get orderDetails(): FormArray {
    return this.orderForm.get('orderDetails') as FormArray;
  }

  addOrderDetail(): void {
    this.orderDetails.push(this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, Validators.required],
      unitPrice: [0],
      totalPrice: [0]
    }));
  }

  removeOrderDetail(index: number): void {
    this.orderDetails.removeAt(index);
    this.calculateTotals();
  }

  calculateTotals(): void {
    let total = 0;
    this.orderDetails.controls.forEach(ctrl => {
      const qty = ctrl.get('quantity')?.value || 0;
      const price = ctrl.get('unitPrice')?.value || 0;
      ctrl.get('totalPrice')?.setValue(qty * price);
      total += qty * price;
    });

    const discount = this.orderForm.get('discount')?.value || 0;
    const tax = this.orderForm.get('taxAmount')?.value || 0;

    this.orderForm.patchValue({
      totalAmount: total,
      netAmount: total + tax - discount
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => this.customers = data,
      error: () => this.error = 'Failed to load customers'
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => this.products = data,
      error: () => this.error = 'Failed to load products'
    });
  }

  loadOrder(id: number): void {
    this.orderService.getById(id).subscribe({
      next: (order: Order) => {
        this.orderForm.patchValue({
          invoiceNo: order.invoiceNo,
          customerId: order.customerId,
          orderDate: order.orderDate,
          totalAmount: order.totalAmount || 0,
          taxAmount: order.taxAmount || 0,
          discount: order.discount || 0,
          netAmount: order.netAmount || 0
        });

        order.orderDetails.forEach(detail => {
          this.orderDetails.push(this.fb.group({
            productId: [detail.productId, Validators.required],
            quantity: [detail.quantity, Validators.required],
            unitPrice: [detail.unitPrice || 0],
            totalPrice: [detail.totalPrice || 0]
          }));
        });

        this.calculateTotals();
      },
      error: () => this.error = 'Failed to load order'
    });
  }

  submit(): void {
    if (this.orderForm.invalid) return;

    const orderData = this.orderForm.getRawValue() as CreateOrder;

    if (this.isEditMode && this.orderId) {
      this.orderService.update(this.orderId, orderData as UpdateOrder).subscribe({
        next: () => {
          this.success = 'Order updated successfully';
          this.error = '';
        },
        error: () => {
          this.error = 'Failed to update order';
          this.success = '';
        }
      });
    } else {
      this.orderService.create(orderData).subscribe({
        next: () => {
          this.success = 'Order created successfully';
          this.error = '';
        },
        error: () => {
          this.error = 'Failed to create order';
          this.success = '';
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}

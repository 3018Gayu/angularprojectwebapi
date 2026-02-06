import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { InventoryTransactionService } from '../inventory-transactionservice';
import { ProductService } from '../../products/product';
import { Product } from '../../products/product.model';
import { CreateTransaction, TransactionFormModel, UpdateTransaction } from '../inventory-transactions-module';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transaction-form.html',
  styleUrls: ['./transaction-form.css']
})
export class TransactionFormComponent implements OnInit {
  isCreateMode = true;

  transactionModel: TransactionFormModel = {
    productId: undefined,
    quantity: 1,
    type: 'IN',
    remarks: ''
  };

  id: number | null = null;
  products: Product[] = [];

  constructor(
    private service: InventoryTransactionService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Load only active products with stock > 0
    this.productService.getActiveProducts().subscribe(data => {
      this.products = data;
    });

    // Check if editing
    this.id = this.route.snapshot.params['id'] || null;
    this.isCreateMode = !this.id;

    if (!this.isCreateMode && this.id) {
      this.service.getById(this.id).subscribe(res => {
        this.transactionModel = {
          productId: res.productId,
          quantity: res.quantity,
          type: res.type.toUpperCase() as 'IN' | 'OUT' | 'DAMAGED',
          remarks: res.remarks
        };
      });
    }
  }

  save() {
    if (!this.transactionModel.productId) {
      alert('Please select a product');
      return;
    }

    if (this.transactionModel.quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    const validTypes: Array<'IN' | 'OUT' | 'DAMAGED'> = ['IN', 'OUT', 'DAMAGED'];
    this.transactionModel.type = this.transactionModel.type.toUpperCase() as 'IN' | 'OUT' | 'DAMAGED';

    if (!validTypes.includes(this.transactionModel.type)) {
      alert('Type must be IN, OUT, or DAMAGED');
      return;
    }

    if (this.isCreateMode) {
      const createDto: CreateTransaction = {
        productId: this.transactionModel.productId!,
        quantity: this.transactionModel.quantity,
        type: this.transactionModel.type,
        remarks: this.transactionModel.remarks
      };
      this.service.create(createDto).subscribe(() => this.router.navigate(['/inventory-transactions']));
    } else {
      const updateDto: UpdateTransaction = {
        productId: this.transactionModel.productId!,
        quantity: this.transactionModel.quantity,
        type: this.transactionModel.type,
        remarks: this.transactionModel.remarks
      };
      this.service.update(this.id!, updateDto).subscribe(() => this.router.navigate(['/inventory-transactions']));
    }
  }

  goBack(): void {
    this.router.navigate(['/inventory-transactions']);
  }
}

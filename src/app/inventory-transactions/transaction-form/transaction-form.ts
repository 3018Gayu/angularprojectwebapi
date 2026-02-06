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
    productId: 0, // initialize with 0 to satisfy TS
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
    // Load only active products
    this.productService.getActiveProducts().subscribe(data => {
      this.products = data.filter(p => p.isActive); // filter inactive just in case
    });

    // Check if editing
    this.id = this.route.snapshot.params['id'] || null;
    this.isCreateMode = !this.id;

    if (!this.isCreateMode && this.id) {
      this.service.getById(this.id).subscribe(res => {
        const type = res.type?.toUpperCase();
        const validTypes: Array<'IN' | 'OUT' | 'DAMAGED'> = ['IN', 'OUT', 'DAMAGED'];
        const transactionType = validTypes.includes(type as any) ? (type as 'IN' | 'OUT' | 'DAMAGED') : 'IN';

        // Ensure the product is active
        if (!this.products.some(p => p.productId === res.productId)) {
          alert('The selected product is inactive or does not exist.');
          this.router.navigate(['/inventory-transactions']);
          return;
        }

        this.transactionModel = {
          productId: res.productId!,
          quantity: res.quantity,
          type: transactionType,
          remarks: res.remarks
        };
      });
    }
  }

  onTypeChange() {
    const validTypes: Array<'IN' | 'OUT' | 'DAMAGED'> = ['IN', 'OUT', 'DAMAGED'];
    const type = this.transactionModel.type.toUpperCase();
    if (validTypes.includes(type as any)) {
      this.transactionModel.type = type as 'IN' | 'OUT' | 'DAMAGED';
    } else {
      this.transactionModel.type = 'IN';
    }
  }

  save() {
    if (!this.transactionModel.productId || this.transactionModel.productId === 0) {
      alert('Please select a product');
      return;
    }

    if (this.transactionModel.quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    const validTypes: Array<'IN' | 'OUT' | 'DAMAGED'> = ['IN', 'OUT', 'DAMAGED'];
    const type = this.transactionModel.type.toUpperCase() as 'IN' | 'OUT' | 'DAMAGED';
    if (!validTypes.includes(type)) {
      alert('Type must be IN, OUT, or DAMAGED');
      return;
    }

    if (this.isCreateMode) {
      const createDto: CreateTransaction = {
        productId: this.transactionModel.productId!,
        quantity: this.transactionModel.quantity,
        type: type,
        remarks: this.transactionModel.remarks
      };
      this.service.create(createDto).subscribe(() => this.router.navigate(['/inventory-transactions']));
    } else {
      const updateDto: UpdateTransaction = {
        productId: this.transactionModel.productId!,
        quantity: this.transactionModel.quantity,
        type: type,
        remarks: this.transactionModel.remarks
      };
      this.service.update(this.id!, updateDto).subscribe(() => this.router.navigate(['/inventory-transactions']));
    }
  }

  goBack(): void {
    this.router.navigate(['/inventory-transactions']);
  }
}

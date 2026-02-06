import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Product } from '../product.model';
import { ProductService } from '../product';
import { Category } from '../../categories/category';
import { CategoryService } from '../../categories/categoryservice';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html'
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product?: Product;
  @Output() saved = new EventEmitter<void>();

  model: Product = this.empty();
  categories: Category[] = [];
  loadingCategories = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Load categories
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: (err: any) => {
        console.error('Failed to load categories', err);
        this.loadingCategories = false;
      }
    });
  }

  ngOnChanges(): void {
    if (this.product) {
      this.model = {
        ...this.product,
        categoryId: this.product.category?.categoryId,
        expiryDate: this.product.expiryDate
          ? this.product.expiryDate.substring(0, 10)
          : ''
      };
    } else {
      this.model = this.empty();
    }
  }

  save(): void {
    // Use Observable<any> to unify create/update return types
    const obs: Observable<any> = this.model.productId
      ? this.productService.update(this.model.productId!, this.model)
      : this.productService.create(this.model);

    obs.subscribe({
      next: () => {
        alert('Product saved successfully');
        this.model = this.empty();
        this.saved.emit();
      },
      error: (err: any) => {
        console.error(err);
        if (err.status === 400) alert(err.error?.message || 'Invalid data');
        else if (err.status === 403) alert('Permission denied');
        else alert('Error saving product');
      }
    });
  }

  private empty(): Product {
    return {
      name: '',
      categoryId: undefined,
      unitPrice: 0,
      stockQty: 0,
      expiryDate: '',
      isActive: true
    };
  }
}

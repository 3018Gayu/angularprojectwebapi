import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product.model';
import { Category } from '../../categories/category';
import { ProductService } from '../product';
import { CategoryService } from '../../categories/categoryservice';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnChanges {
  @Input() product?: Product;
  @Output() saved = new EventEmitter<void>();

  model: Product = {
    name: '',
    unitPrice: 0,
    stockQty: 0,
    expiryDate: '',
    isActive: true
  };

  categories: Category[] = [];

  constructor(private service: ProductService, private categoryService: CategoryService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.model = { ...this.product };
    }
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  save() {
    if (this.model.productId) {
      this.service.update(this.model.productId, this.model).subscribe(() => this.afterSave());
    } else {
      this.service.create(this.model).subscribe(() => this.afterSave());
    }
  }

  private afterSave() {
    this.model = { name: '', unitPrice: 0, stockQty: 0, expiryDate: '', isActive: true };
    this.saved.emit();
  }
}

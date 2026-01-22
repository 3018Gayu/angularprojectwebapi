import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form';
import { Product } from '../product.model';
import { ProductService } from '../product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selected?: Product;

  constructor(private service: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.products = data);
  }

  edit(product: Product) {
    this.selected = { ...product };
  }

  delete(id: number) {
    if (confirm('Are you sure to delete this product?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}


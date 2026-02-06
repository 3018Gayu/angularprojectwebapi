import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';
import { ProductService } from '../product';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selected?: Product;
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load products', err);
        alert('Failed to load products. Check backend connection.');
        this.loading = false;
      }
    });
  }

  edit(product: Product): void {
    this.selected = { ...product };
  }

  delete(productId?: number): void {
    if (!productId) return;
    if (!confirm('Are you sure to delete this product?')) return;

    this.productService.delete(productId).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.loadProducts();
      },
      error: err => {
        console.error(err);
        if (err.status === 400) alert(err.error?.message || 'Cannot delete product');
        else if (err.status === 404) {
          alert('Product not found');
          this.loadProducts();
        } else alert('Error deleting product');
      }
    });
  }

  onSaved(): void {
    this.selected = undefined;
    this.loadProducts();
  }

  trackById(index: number, product: Product) {
    return product.productId;
  }
}

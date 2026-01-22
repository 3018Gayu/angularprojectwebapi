import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '../category-form/category-form';
import { Category } from '../category';
import { CategoryService } from '../categoryservice';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent],
  templateUrl: './category-list.html'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selected?: Category;

  constructor(private service: CategoryService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.categories = data);
  }

  edit(category: Category) {
    this.selected = { ...category };
  }

  delete(id: number) {
    if (confirm('Delete this category?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}

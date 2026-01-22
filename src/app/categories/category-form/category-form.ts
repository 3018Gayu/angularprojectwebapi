import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../categoryservice';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.html'
})
export class CategoryFormComponent implements OnChanges {
  @Input() category?: Category;
  @Output() saved = new EventEmitter<void>();

  model: Category = {
    categoryId: 0,
    categoryName: '',
    description: ''
  };

  constructor(private service: CategoryService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && this.category) {
      this.model = { ...this.category };
    }
  }

  save() {
    if (this.model.categoryId && this.model.categoryId > 0) {
      this.service.update(this.model.categoryId, this.model)
        .subscribe(() => this.afterSave());
    } else {
      this.service.create(this.model)
        .subscribe(() => this.afterSave());
    }
  }

  private afterSave() {
    this.reset();
    this.saved.emit();
    this.category = undefined; // Clear selection after save
  }

  private reset() {
    this.model = {
      categoryId: 0,
      categoryName: '',
      description: ''
    };
  }
}
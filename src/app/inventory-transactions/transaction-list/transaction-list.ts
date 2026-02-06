import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryTransactionService } from '../inventory-transactionservice';
import { InventoryTransaction } from '../inventory-transactions-module';
@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.css']
})
export class TransactionListComponent implements OnInit {
  transactions: InventoryTransaction[] = [];
  loading = true;
  error = '';

  constructor(private service: InventoryTransactionService) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: res => {
        this.transactions = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load transactions';
        this.loading = false;
      }
    });
  }

  deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.service.delete(id).subscribe(() => this.fetchTransactions());
    }
  }
}

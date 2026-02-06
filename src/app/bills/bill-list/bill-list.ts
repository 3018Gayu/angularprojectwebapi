import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BillService } from '../billservice';
import { Bill } from '../bill.model';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bill-list.html'
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  loading = false;

  constructor(private billService: BillService, private router: Router) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills() {
    this.loading = true;
    this.billService.getBills().subscribe(data => {
      this.bills = data;
      this.loading = false;
    });
  }

  deleteBill(id: number) {
    if (!confirm('Delete this bill?')) return;
    this.billService.deleteBill(id).subscribe(() => {
      this.bills = this.bills.filter(b => b.billId !== id);
    });
  }

  newBill() {
    this.router.navigate(['/bills/new']);
  }

  editBill(id: number) {
    this.router.navigate(['/bills/edit', id]);
  }
}

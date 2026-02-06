import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailySale } from '../models/daily-sale';
import { ReportService } from '../report';

@Component({
  selector: 'app-monthly-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monthly-sales-report.html',
  styleUrls: ['./monthly-sales-report.css']
})
export class MonthlySalesReportComponent implements OnInit {

  sales: DailySale[] = [];

  // used by date picker in HTML
  selectedDate: string = '';

  month!: number;
  year!: number;
  categoryId?: number;
  loading = false;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    const today = new Date();
    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();

    // initialize date input (yyyy-MM)
    this.selectedDate = `${this.year}-${String(this.month).padStart(2, '0')}`;

    this.getMonthlySales();
  }

  /** triggered by button click in HTML */
  loadSales(): void {
    if (!this.selectedDate) {
      return;
    }

    const [year, month] = this.selectedDate.split('-').map(Number);
    this.year = year;
    this.month = month;

    this.getMonthlySales();
  }

  getMonthlySales(): void {
    this.loading = true;

    this.reportService
      .getMonthlySales(this.month, this.year, this.categoryId)
      .subscribe({
        next: (res: DailySale[]) => {
          this.sales = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  downloadPdf(): void {
    this.reportService
      .downloadMonthlySalesPdf(this.month, this.year, this.categoryId)
      .subscribe({
        next: (res: Blob) => {
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `MonthlySalesReport_${this.month}_${this.year}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => console.error(err)
      });
  }
}

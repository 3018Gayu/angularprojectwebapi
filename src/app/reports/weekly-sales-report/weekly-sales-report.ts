import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../report';
import { DailySale } from '../models/daily-sale';

@Component({
  selector: 'app-weekly-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weekly-sales-report.html',
  styleUrls: ['./weekly-sales-report.css']
})
export class WeeklySalesReportComponent implements OnInit {

  sales: DailySale[] = [];

  startDate!: string; // user-selected
  endDate!: string;   // auto-calculated

  loading = false;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    const today = new Date();
    this.startDate = today.toISOString().substring(0, 10);
    this.calculateEndDate();
    this.getWeeklySales();
  }

  /** Auto-calculate end date = start + 6 days */
  calculateEndDate(): void {
    if (!this.startDate) return;

    const start = new Date(this.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    this.endDate = end.toISOString().substring(0, 10);
  }

  /** Load weekly sales */
  getWeeklySales(): void {
    if (!this.startDate) return;

    this.calculateEndDate();
    this.loading = true;

    this.reportService
      .getWeeklySales(this.startDate, this.endDate)
      .subscribe({
        next: (res: DailySale[]) => {
          this.sales = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Weekly sales error:', err);
          this.loading = false;
        }
      });
  }

  /** Download weekly sales PDF */
  downloadPdf(): void {
    this.calculateEndDate();

    this.reportService
      .downloadWeeklySalesPdf(this.startDate, this.endDate)
      .subscribe({
        next: (res: Blob) => {
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = `WeeklySales_${this.startDate}_to_${this.endDate}.pdf`;
          a.click();

          window.URL.revokeObjectURL(url);
        },
        error: (err) => console.error('Weekly PDF error:', err)
      });
  }
}

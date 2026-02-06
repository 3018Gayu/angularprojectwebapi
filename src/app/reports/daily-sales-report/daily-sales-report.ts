import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../report';
import { DailySale } from '../models/daily-sale';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-daily-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ CommonModule + FormsModule for ngModel
  templateUrl: './daily-sales-report.html',
  styleUrls: ['./daily-sales-report.css']
})
export class DailySalesReportComponent {

  selectedDate: string = new Date().toISOString().split('T')[0]; // default to today
  sales: DailySale[] = [];
  loading = false;

  constructor(private reportService: ReportService) {}

  loadSales() {
    if (!this.selectedDate) return;
    this.loading = true;
    this.reportService.getDailySales(this.selectedDate).subscribe({
      next: data => {
        this.sales = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  downloadPdf() {
    if (!this.selectedDate) return;
    this.reportService.downloadDailySalesPdf(this.selectedDate).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DailySalesReport-${this.selectedDate}.pdf`;
      a.click();
    });
  }
}

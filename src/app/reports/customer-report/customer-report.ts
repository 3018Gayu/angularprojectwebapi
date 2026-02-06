import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../models/customer';
import { HttpClientModule } from '@angular/common/http';
import { ReportService } from '../report';

@Component({
  selector: 'app-customer-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './customer-report.html',
  styleUrls: ['./customer-report.css']
})
export class CustomerReportComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.reportService.getCustomers().subscribe({
      next: data => {
        this.customers = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching customers', err);
        this.loading = false;
      }
    });
  }

  downloadPdf() {
    this.reportService.downloadCustomersPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CustomerReport.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }, err => {
      console.error('Error downloading PDF', err);
    });
  }
}

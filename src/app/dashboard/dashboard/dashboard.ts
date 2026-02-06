import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { Dashboard, RecentTransactionDTO, Product } from '../dashboard';
import { DashboardService } from '../dashboardservice';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    NgClass,
    CurrencyPipe,
    NgChartsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard = new Dashboard();
  loading = true;

  // 🔴 EXPIRED PRODUCTS
  expiredProducts: Product[] = [];

  // ===================== LINE CHART SETTINGS =====================
  chartType: ChartType = 'line';

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Sales Last 7 Days' }
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 5 }
    },
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  last7DaysChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sales',
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13,110,253,0.2)',
        fill: true
      }
    ]
  };

  constructor(
    private dashboardService: DashboardService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (res) => {
        this.dashboard = res;

        // ===== CHART =====
        this.last7DaysChartData.labels = res.last7DaysLabels || [];
        this.last7DaysChartData.datasets[0].data = res.last7DaysSales || [];

        // ===== EXPIRED PRODUCTS LOGIC =====
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const allProducts: Product[] = [
          ...(res.recentProducts || []),
          ...(res.lowStockProducts || [])
        ];

        this.expiredProducts = allProducts.filter(p =>
          p.expiryDate && new Date(p.expiryDate) < today
        );

        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.loading = false;
      }
    });
  }

  trackByInvoice(index: number, tx: RecentTransactionDTO) {
    return tx.invoiceNo;
  }

  trackByProduct(index: number, p: Product) {
    return p.productId;
  }
}

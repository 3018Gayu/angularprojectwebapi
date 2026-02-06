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

  // ===================== LINE CHART SETTINGS =====================
  chartType: ChartType = 'line';

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Sales Last 7 Days'
      }
    },
    elements: {
      line: { tension: 0.4 }, // smooth curve
      point: { radius: 5 }    // show markers
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
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
        fill: true,
        tension: 0.4
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

        // ===== CHART DATA =====
        this.last7DaysChartData.labels = res.last7DaysLabels || [];
        this.last7DaysChartData.datasets[0].data = res.last7DaysSales || [];

        // ===== INVENTORY FIX =====
        if (this.auth.isInventory()) {
          this.dashboard.productsCount =
            res.productsCount && res.productsCount > 0
              ? res.productsCount
              : (res.recentProducts?.length || 0);

          this.dashboard.lowStockCount =
            res.lowStockCount && res.lowStockCount > 0
              ? res.lowStockCount
              : (res.lowStockProducts?.length || 0);
        }

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

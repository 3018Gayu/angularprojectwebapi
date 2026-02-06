import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReportComponent } from './customer-report/customer-report';
import { DailySalesReportComponent } from './daily-sales-report/daily-sales-report';
import { MonthlySalesReportComponent } from './monthly-sales-report/monthly-sales-report';
import { WeeklySalesReportComponent } from './weekly-sales-report/weekly-sales-report';

const routes: Routes = [
  { path: 'customer', component: CustomerReportComponent },
  { path: 'daily-sales', component: DailySalesReportComponent },
  { path: 'monthly-sales', component: MonthlySalesReportComponent},
  { path: 'weekly-sales', component: WeeklySalesReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

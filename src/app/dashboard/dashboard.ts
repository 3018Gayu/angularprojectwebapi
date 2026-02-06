// ============================
// Dashboard Models
// ============================

export class Dashboard {
  // Admin
  totalSales: number = 0;
  customerCount: number = 0;
  lowStockCount: number = 0;
  userCount: number = 0;
  recentTransactions: RecentTransactionDTO[] = [];
  last7DaysLabels: string[] = [];
  last7DaysSales: number[] = [];
  ordersCount: number = 0;
  orderDetailsCount: number = 0;

  // Cashier
  todaysSales: number = 0;
  todaysInvoices: number = 0;
  recentBills: RecentTransactionDTO[] = [];

  // Inventory
  productsCount: number = 0;
  supplierCount: number = 0;
  lowStockProducts: Product[] = [];
  expiredProducts: Product[] = [];
  recentProducts: Product[] = [];
}

// ============================
// Recent Transactions
// ============================

export class RecentTransactionDTO {
  date: string = '';               // original API string
  invoiceNo: string = '';
  customer: string = 'Walk-in';
  amount: number = 0;
  cashier: string = 'N/A';

  // ✅ optional property for Angular DatePipe
  dateObj?: Date;
}

// ============================
// Product
// ============================

export class Product {
  productId?: number;
  name: string = '';
  categoryId?: number;
  unitPrice: number = 0;
  stockQty: number = 0;
  expiryDate?: string;
  isActive: boolean = true;
}

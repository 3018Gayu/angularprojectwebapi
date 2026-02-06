export interface BillItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Bill {
  billId: number;
  billDate: string;
  customerId?: number;
  totalAmount: number;
  discountAmount: number;
  discountPercent: number;
  billItems: BillItem[];
}

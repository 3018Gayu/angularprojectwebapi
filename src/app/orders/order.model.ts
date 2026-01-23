export class Order {
  orderId!: number;
  invoiceNo!: string;
  customerId!: number;
  customerName?: string;
  orderDate!: Date;
  totalAmount?: number;
  taxAmount?: number;
  discount?: number;
  netAmount?: number;
  orderDetails: OrderDetail[] = [];
}

export class OrderDetail {
  productId!: number;
  productName?: string;
  quantity!: number;
  unitPrice!: number;
  totalPrice!: number;
}

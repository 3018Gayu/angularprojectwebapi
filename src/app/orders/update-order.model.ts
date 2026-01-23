import { OrderDetail } from "./order.model";


export class UpdateOrder {
  invoiceNo!: string;
  customerId!: number;
  orderDate!: Date;
  totalAmount?: number;
  taxAmount?: number;
  discount?: number;
  netAmount?: number;
  orderDetails: OrderDetail[] = [];
}

import { BillItem } from "./bill.model";



export interface CreateBill {
  billDate: string;
  customerId?: number;
  totalAmount: number;
  discountAmount: number;
  discountPercent: number;
  billItems: BillItem[];
}

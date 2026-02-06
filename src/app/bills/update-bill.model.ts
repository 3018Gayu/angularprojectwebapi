import { BillItem } from "./bill.model";



export interface UpdateBill {
  billDate: string;
  customerId?: number;
  totalAmount: number;
  discountAmount: number;
  discountPercent: number;
  billItems: BillItem[];
}

// src/app/orderdetails/orderdetail.ts
export interface OrderDetail {
  orderDetailId?: number; // optional for create
  orderId?: number;       // <--- add this
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface Product {
  productId?: number;
  name: string;
  categoryId?: number;
  categoryName?: string;
  unitPrice: number;
  stockQty: number;
  expiryDate: string;
  isActive: boolean;
}

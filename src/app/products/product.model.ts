export interface Product {
  productId?: number;
  name: string;
  categoryId?: number;
  unitPrice: number;
  stockQty: number;
  expiryDate: string;
  isActive: boolean;
  category?: {
    categoryId: number;
    categoryName: string;
  };
}

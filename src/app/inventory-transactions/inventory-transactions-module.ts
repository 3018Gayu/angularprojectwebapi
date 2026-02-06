export interface InventoryTransaction {
  transId: number;
  productId: number;
  productName: string;
  quantity: number;
  type: 'IN' | 'OUT' | 'DAMAGED';
  remarks?: string;
  date: string;
}

export interface TransactionFormModel {
  productId?: number; // required for update
  quantity: number;
  type: 'IN' | 'OUT' | 'DAMAGED';
  remarks?: string;
}

export interface CreateTransaction {
  productId: number;
  quantity: number;
  type: 'IN' | 'OUT' | 'DAMAGED';
  remarks?: string;
}

export interface UpdateTransaction {
  productId: number; // ✅ Include productId for update
  quantity: number;
  type: 'IN' | 'OUT' | 'DAMAGED';
  remarks?: string;
}

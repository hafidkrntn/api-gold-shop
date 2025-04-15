export interface StockProducts {
  id: string;
  stock: number;
  productId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductForm {
  id?: string; // Make optional for creation
  code: string;
  name: string;
  description: string;
  prices: number;
  createdAt?: Date; // Auto-generated, so optional
  updatedAt?: Date; // Auto-generated, so optional
  Stock?: StockProducts | null;
}
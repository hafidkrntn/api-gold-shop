export interface StockProducts {
  id: string;
  stock: number;
  productId: string;
}

export interface ProductForm {
  id?: string; // Make optional for creation
  name: string;
  productTypeId: string;
  purityId: string;
  manufacturerId: string | null;
  weight: number;
  costPrice: number;
  sellingPrice: number;
  designDescription: string | null;
  createdAt?: Date; // Auto-generated, so optional
  updatedAt?: Date; // Auto-generated, so optional
  Stock?: StockProducts | null;
}
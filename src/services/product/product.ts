import { prisma } from "../../config/db";
import { ProductForm, StockProducts,  } from "../../types";

export const productService = {
  async createProduct(
    productData: Omit<ProductForm, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ProductForm> {
    // Validate required fields
    const requiredFields = [
      'name', 'weight', 'costPrice', 'sellingPrice',
      'designDescription', 'productTypeId', 'purityId', 'manufacturerId'
    ];

    for (const field of requiredFields) {
      if (!productData[field as keyof typeof productData]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate stock if provided
    if (productData.Stock && productData.Stock.stock < 0) {
      throw new Error('Stock quantity cannot be negative');
    }

    return await prisma.$transaction(async (tx) => {
      // Create product
      const product = await tx.product.create({
        data: {
          name: productData.name,
          costPrice: productData.costPrice,
          sellingPrice: productData.sellingPrice,
          weight: productData.weight,
          designDescription: productData.designDescription,
          productTypeId: productData.productTypeId,
          purityId: productData.purityId,
          manufacturerId: productData.manufacturerId,
        },
      });

      // Create stock if provided
      let stock: StockProducts | null = null;
      if (productData.Stock) {
        const stockRecord = await tx.stocks.create({
          data: {
            quantity: productData.Stock.stock,
            productId: product.id,
          },
        });
        stock = {
          id: stockRecord.id,
          stock: stockRecord.quantity,
          productId: stockRecord.productId,
        };
      }

      return {
        id: product.id,
        name: product.name,
        weight: product.weight,
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
        designDescription: product.designDescription,
        productTypeId: product.productTypeId,
        purityId: product.purityId,
        manufacturerId: product.manufacturerId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        Stock: stock,
      };
    });
  },
};
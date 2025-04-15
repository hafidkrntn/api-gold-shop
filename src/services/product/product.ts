import { prisma } from "../../config/db";
import { ProductForm, StockProducts,  } from "../../types";

export const productService = {
  async createProduct(productData: Omit<ProductForm, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductForm> {
    // Validate required fields
    if (!productData.code || !productData.name || typeof productData.prices !== 'number') {
      throw new Error('Missing required fields or invalid data types');
    }

    // Validate stock if provided
    if (productData.Stock && productData.Stock.stock < 0) {
      throw new Error('Stock quantity cannot be negative');
    }

    return await prisma.$transaction(async (tx) => {
      // Create product
      const product = await tx.product.create({
        data: {
          code: productData.code,
          name: productData.name,
          description: productData.description,
          prices: productData.prices,
        },
        include: {
          stock: true // Include stock relation
        }
      });

      // Create stock if provided
      let stock: StockProducts | null = null;
      if (productData.Stock) {
        const stockRecord = await tx.stock.create({
          data: {
            stock: productData.Stock.stock,
            productId: product.id,
          },
        });
        stock = {
          id: stockRecord.id,
          stock: stockRecord.stock,
          productId: stockRecord.productId
        };
      }

      return {
        id: product.id,
        code: product.code,
        name: product.name,
        description: product.description,
        prices: product.prices,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        Stock: stock
      };
    });
  },
};
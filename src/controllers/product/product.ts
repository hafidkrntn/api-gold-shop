import { Request, Response } from "express";
import { ProductForm } from "../../types";
import { productService } from "../../services";
import { Responses } from "../../utils";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: Omit<ProductForm, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    
    // Additional validation
    if (productData.costPrice <= 0) {
      throw new Error('Price must be greater than 0');
    }

    const newProduct = await productService.createProduct(productData);
    Responses.SuccessCreate(res, newProduct);
  } catch (err: any) {
    Responses.ErrorBadRequest(res, err)
  }
}